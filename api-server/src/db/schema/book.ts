import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

import { harbors } from './harbor';

export const books = pgTable('books', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
});

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

export const bookRefsRelations = relations(bookRefs, ({ one }) => ({
    book: one(books),
    harbor: one(harbors),
}));
