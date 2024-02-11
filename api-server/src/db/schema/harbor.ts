import { relations } from 'drizzle-orm';
import {
    bigserial,
    boolean,
    integer,
    numeric,
    pgTable,
    primaryKey,
    text,
} from 'drizzle-orm/pg-core';

import { Direction } from '../../types/enums/direction';
import { HarborType } from '../../types/enums/harbor-type';
import { bookRefs } from './book';

export const harbors = pgTable('harbors', {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    name: text('name').notNull(),
    latitude: numeric('latitude').notNull(),
    longitude: numeric('longitude').notNull(),
    chartNumber: integer('chart_number').notNull(),
    harborType: integer('harbor_type').notNull().$type<HarborType>(),
});

export type HarborSelect = typeof harbors.$inferSelect;
export type HarborInsert = typeof harbors.$inferInsert;

export const harborsRelations = relations(harbors, ({ many, one }) => ({
    details: many(harborDetails),
    book: one(bookRefs),
}));

export const harborDetails = pgTable('harbor_details', {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    name: text('name').notNull(),
    harborId: integer('harbor_id')
        .notNull()
        .references(() => harbors.id),
    anchor: boolean('anchor').notNull().default(false),
    sxkBuoy: boolean('sxk_buoy').notNull().default(false),
    latitude: numeric('latitude'),
    longitude: numeric('longitude'),
    harborType: integer('harbor_type').$type<HarborType>(),
    shieldedDirections: integer('shielded_directions')
        .array()
        .$type<Direction[]>(),
});

export type HarborDetailSelect = typeof harborDetails.$inferSelect;
export type HarborDetailInsert = typeof harborDetails.$inferInsert;

export const harborDetailsRelations = relations(harborDetails, ({ one }) => ({
    harbor: one(harbors, {
        fields: [harborDetails.harborId],
        references: [harbors.id],
    }),
}));
