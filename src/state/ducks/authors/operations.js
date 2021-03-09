import { createAction } from 'redux-api-middleware';
import types from "./types";
import { normalize, schema } from "normalizr";


const authorSchema = new schema.Entity('author');
const publisherSchema = new schema.Entity('publisher');
const bookSchema = new schema.Entity('books', {
    author: authorSchema,
    publisher: publisherSchema
});
const booksSchema = new schema.Array(bookSchema);

const favoriteSchema = new schema.Entity('favorites');
const favoritesSchema = new schema.Array(favoriteSchema);



const getFavorites = () => (dispatch) => dispatch(createAction({
    endpoint: 'http://localhost:5000/favorites',
    method: 'GET',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        types.FAVORITES_REQUEST,
        {
            type: types.FAVORITES_SUCCESS,
            payload: async (action, state, res) => {
                const json = await res.json();
                const { entities } = normalize(json, favoritesSchema);
                return entities;
            },
            meta: { actionType: 'GET_ALL' }
        },
        types.FAVORITES_FAILURE]
}));


const getBooks = () => (dispatch) => dispatch(createAction({
    endpoint: 'http://localhost:5000/books',
    method: 'GET',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        types.BOOKS_REQUEST,
        {
            type: types.BOOKS_SUCCESS,
            payload: async (action, state, res) => {
                const json = await res.json();
                const { entities } = normalize(json, booksSchema);
                return entities;
            },
            meta: { actionType: 'GET_ALL' }
        },
        types.BOOKS_FAILURE]
}));

const operations = {
    getBooks,
    getFavorites
}

export default operations