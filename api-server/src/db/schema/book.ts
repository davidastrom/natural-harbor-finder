import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

import { harbors } from './harbor';

export const books = pgTable('books', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
});

export type BookSelect = typeof books.$inferSelect;
export type BookInsert = typeof books.$inferInsert;

export const booksRelations = relations(books, ({ many }) => ({
    harborRefs: many(bookRefs),
}));

export const bookRefs = pgTable('book_refs', {
    bookId: integer('book_id')
        .notNull()
        .references(() => books.id),
    page: integer('page'),
    harborId: integer('harbor_id')
        .notNull()
        .references(() => harbors.id)
        .primaryKey(),
});

export type BookRefSelect = typeof bookRefs.$inferSelect;
export type BookRefInsert = typeof bookRefs.$inferInsert;

export const bookRefsRelations = relations(bookRefs, ({ one }) => ({
    book: one(books, {
        fields: [bookRefs.bookId],
        references: [books.id],
    }),
    harbor: one(harbors, {
        fields: [bookRefs.harborId],
        references: [harbors.id],
    }),
}));
