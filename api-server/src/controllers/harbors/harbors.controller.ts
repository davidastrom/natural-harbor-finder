import { Request, Response } from 'express';

import { Harbor, HarborModel } from '../../models/harbors/harbor.model';
import { Position } from '../../models/position.model';
import { createHarborInputModel, getAllHarborInputModel } from './harbors.dto';

export async function getAllHarbors(
    req: Request,
    res: Response
): Promise<void> {
    const input = req.query as getAllHarborInputModel;
    let position = undefined as undefined | Position;
    if (input.lat && input.lng) {
        position = new Position(input.lat, input.lng);
    }
    const harbors = await HarborModel.getHarbors(
        position,
        input.shieldedDirections,
        input.take
    );
    res.send(harbors);
}

export async function createHarbor(req: Request, res: Response): Promise<void> {
    const input = req.body as createHarborInputModel;
    input._id = undefined;
    const harbor = new HarborModel(input);
    await harbor.save();
    res.send(harbor as Harbor);
}

export async function updateHarbor(req: Request, res: Response): Promise<void> {
    const harborId = req.params.harborId;
    const harbor = await HarborModel.findById(harborId);
    if (!harbor) {
        throw new Error(`Harbor with id ${harborId} does not exist`);
    }
    const input = req.body as createHarborInputModel;

    harbor.set(input);
    // harbor.name = input.name;
    // if (
    //     harbor.location.lat !== input.location.lat ||
    //     harbor.location.lng !== input.location.lng
    // ) {
    //     harbor.location = new Position(input.location.lat, input.location.lng);
    // }
    // harbor.chartNumber = input.chartNumber;
    // harbor.harborType = input.harborType;

    // if (input.book) {
    //     if (!harbor.book) {
    //         harbor.book = {
    //             ref: input.book.ref,
    //             page: input.book.page,
    //             title: input.book.title,
    //         };
    //     } else {
    //         harbor.book.ref = input.book.ref;
    //         harbor.book.page = input.book.page;
    //         harbor.book.title = input.book.title;
    //     }
    // } else {
    //     harbor.book = undefined;
    // }

    // harbor.updateOne

    // harbor.details.pull(
    //     harbor.details.filter(
    //         (detail) => !input.details.some((d) => d._id === detail._id)
    //     )
    // );

    // input.details.forEach((detail) => {
    //     if (detail._id) {
    //         const existingDetail = harbor.details.id(detail._id);
    //         if (existingDetail) {
    //             existingDetail.set(detail);
    //         }
    //     }
    //     harbor.details.addToSet(detail);
    // });

    await harbor.save();
    res.send(harbor as Harbor);
}
