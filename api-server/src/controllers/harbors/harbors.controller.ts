import { arrayOverlaps, eq } from 'drizzle-orm';
import { Request, Response } from 'express';

import { db } from '../../db/db.config';
import { bookRefs, books } from '../../db/schema/book';
import {
  HarborDetailInsert,
  harborDetails,
  HarborInsert,
  harbors
} from '../../db/schema/harbor';
import { Position } from '../../models/position.model';
import { haversineNautical } from '../../utils/distance.util';
import {
  createHarborDetailInputModel,
  createHarborInputModel,
  getAllHarborInputModel
} from './harbors.dto';

export async function getAllHarbors(
    req: Request,
    res: Response
): Promise<void> {
    const input = req.query as getAllHarborInputModel;
    const position =
        input.lat && input.lng ? new Position(input.lat, input.lng) : null;
    const directions = input.shieldedDirections || [];
    const detailsInclude =
        directions.length > 0
            ? {
                  where: arrayOverlaps(
                      harborDetails.shieldedDirections,
                      directions
                  ),
              }
            : true;
    const dbHarbors = await db.query.harbors.findMany({
        with: {
            details: detailsInclude,
            bookRef: {
                with: {
                    book: true,
                },
            },
        },
    });

    let harbors = dbHarbors.map((harbor) => ({
        ...harbor,
        location: new Position(+harbor.latitude, +harbor.longitude),
        details: harbor.details.map((detail) => ({
            ...detail,
            location:
                detail.latitude && detail.longitude
                    ? new Position(+detail.latitude, +detail.longitude)
                    : undefined,
        })),
    }));

    if (position) {
        harbors = harbors.sort(
            (a, b) =>
                haversineNautical(position, a.location) -
                haversineNautical(position, b.location)
        );
    }

    if (input.take) {
        harbors = harbors.slice(0, input.take);
    }

    res.send(harbors);
}

export async function createHarbor(req: Request, res: Response): Promise<void> {
    const input = req.body as createHarborInputModel;
    const dbInput: HarborInsert = getHarborInsert(input);
    const harbor = (
        await db
            .insert(harbors)
            .values(dbInput)
            .returning({ harborId: harbors.id })
    )[0];

    if (input.book) {
        const existing = await db.query.books.findFirst({
            where: eq(books.title, input.book.title),
        });
        let bookId = existing?.id;
        if (!bookId) {
            const newBook = (
                await db
                    .insert(books)
                    .values({ title: input.book.title })
                    .returning()
            )[0];
            bookId = newBook.id;
        }
        await db.insert(bookRefs).values({
            bookId,
            harborId: harbor.harborId,
            page: input.book.page,
        });
    }

    const detailInputs: HarborDetailInsert[] = input.details.map((detail) =>
        getHarborDetailInsert(harbor.harborId, detail)
    );
    await db.insert(harborDetails).values(detailInputs);

    const newHarbor = await getHarborById(harbor.harborId);

    res.send(newHarbor);
}

export async function updateHarbor(req: Request, res: Response): Promise<void> {
    const harborId = +req.params.harborId;
    const harbor = await getHarborById(harborId);
    if (!harbor) {
        throw new Error(`Harbor with id ${harborId} does not exist`);
    }
    const input = req.body as createHarborInputModel;

    await db
        .update(harbors)
        .set(getHarborInsert(input))
        .where(eq(harbors.id, harborId));

    for (const detail of harbor.details) {
        const inputDetail = input.details.find((d) => d.id === detail.id);
        if (!inputDetail) {
            await db
                .delete(harborDetails)
                .where(eq(harborDetails.id, detail.id));
            continue;
        }

        await db
            .update(harborDetails)
            .set(getHarborDetailInsert(harborId, inputDetail))
            .where(eq(harborDetails.id, detail.id));
    }

    for (const inputDetail of input.details) {
        if (!inputDetail.id) {
            await db
                .insert(harborDetails)
                .values(getHarborDetailInsert(harborId, inputDetail));
        }
    }

    if (input.book) {
        const existingBook = await db.query.books.findFirst({
            where: eq(books.title, input.book.title),
        });
        let existingBookId = existingBook?.id;
        if (!existingBookId) {
            const newBook = (
                await db
                    .insert(books)
                    .values({ title: input.book.title })
                    .returning()
            )[0];
            existingBookId = newBook.id;
        }
        if (!harbor.bookRef) {
            await db.insert(bookRefs).values({
                bookId: existingBookId,
                harborId,
                page: input.book.page,
            });
        } else {
            await db
                .update(bookRefs)
                .set({
                    bookId: existingBookId,
                    page: input.book.page,
                })
                .where(eq(bookRefs.harborId, harborId));
        }
    } else {
        if (harbor.bookRef) {
            await db
                .delete(bookRefs)
                .where(eq(bookRefs.harborId, harbor.bookRef.harborId));
        }
    }

    const updatedHarbor = await getHarborById(harborId);

    res.send(updatedHarbor);
}

async function getHarborById(harborId: number) {
    return await db.query.harbors.findFirst({
        where: eq(harbors.id, harborId),
        with: {
            details: true,
            bookRef: {
                with: {
                    book: true,
                },
            },
        },
    });
}

function getHarborInsert(input: createHarborInputModel): HarborInsert {
    return {
        chartNumber: input.chartNumber,
        harborType: input.harborType,
        latitude: input.location.lat.toString(),
        longitude: input.location.lng.toString(),
        name: input.name,
    };
}

function getHarborDetailInsert(
    harborId: number,
    detailInput: createHarborDetailInputModel
): HarborDetailInsert {
    return {
        harborId: harborId,
        anchor: detailInput.anchor,
        harborType: detailInput.harborType,
        latitude: detailInput.location?.lat.toString(),
        longitude: detailInput.location?.lng.toString(),
        name: detailInput.name,
        shieldedDirections: detailInput.shieldedDirections,
        sxkBuoy: detailInput.sxkBuoy,
    };
}
