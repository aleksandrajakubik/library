import { schema } from "normalizr";


const authorSchema = new schema.Entity('author');
const publisherSchema = new schema.Entity('publisher');
const bookSchema = new schema.Entity('books', {
    author: authorSchema,
    publisher: publisherSchema
});
const booksSchema = new schema.Array(bookSchema);

const favoriteSchema = new schema.Entity('favorites');
const favoritesSchema = new schema.Array(favoriteSchema);

const wantToReadSchema = new schema.Entity('wantToRead');
const wantToReadsSchema = new schema.Array(wantToReadSchema);

const readSchema = new schema.Entity('read');
const readsSchema = new schema.Array(readSchema);

const schemas = { 
    bookSchema,
    booksSchema,
    favoritesSchema,
    wantToReadsSchema,
    readsSchema
}

export default schemas