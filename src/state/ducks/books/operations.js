import { createAction } from 'redux-api-middleware';
import types from "./types";
import { normalize } from "normalizr";
import schemas from './schemas';


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
                const { entities } = normalize(json, schemas.booksSchema);
                return entities;
            },
            meta: { actionType: 'GET_ALL' }
        },
        types.BOOKS_FAILURE]
}));

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
                const { entities } = normalize(json, schemas.favoritesSchema);
                return entities;
            },
            meta: { actionType: 'GET_ALL' }
        },
        types.FAVORITES_FAILURE]
}));

const deleteBook = (idToDelete) => (dispatch) => dispatch(createAction({
    endpoint: `http://localhost:5000/books/${idToDelete}`,
    method: 'DELETE',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        types.BOOKS_REQUEST,
        {
            type: types.DELETE_BOOK,
            payload: async (action, state, res) => {
                const id = idToDelete.toString();
                const entities = { books: { id } }
                return entities;
            },
            meta: { actionType: 'DELETE_ONE' }

        },
        types.BOOKS_FAILURE,
    ]
}));

const deleteFromFavorites = (idToDelete) => (dispatch) => dispatch(createAction({
    endpoint: `http://localhost:5000/favorites/${idToDelete}`,
    method: 'DELETE',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        types.FAVORITES_REQUEST,
        {
            type: types.DELETE_BOOK,
            payload: async (action, state, res) => {
                const id = idToDelete.toString();
                const entities = { favorites: { id } }
                return entities;
            },
            meta: { actionType: 'DELETE_ONE' }

        },
        types.FAVORITES_FAILURE,
    ]
}));

const deleteFromRead = (idToDelete) => (dispatch) => dispatch(createAction({
    endpoint: `http://localhost:5000/read/${idToDelete}`,
    method: 'DELETE',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        types.READ_REQUEST,
        {
            type: types.DELETE_BOOK,
            payload: async (action, state, res) => {
                const id = idToDelete.toString();
                const entities = { read: { id } }
                return entities;
            },
            meta: { actionType: 'DELETE_ONE' }

        },
        types.READ_FAILURE,
    ]
}));


const deleteFromWantToRead = (idToDelete) => (dispatch) => dispatch(createAction({
    endpoint: `http://localhost:5000/wantToRead/${idToDelete}`,
    method: 'DELETE',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        types.WANTTOREAD_REQUEST,
        {
            type: types.DELETE_BOOK,
            payload: async (action, state, res) => {
                const id = idToDelete.toString();
                const entities = { wantToRead: { id } }
                return entities;
            },
            meta: { actionType: 'DELETE_ONE' }

        },
        types.WANTTOREAD_FAILURE,
    ]
}));

const editBook = (id, book) => (dispatch) => dispatch(createAction({
    endpoint: `http://localhost:5000/books/${id}`,
    method: 'PATCH',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...book }),
    types: [
        types.BOOKS_REQUEST,
        {
          type: types.EDIT_BOOK,
          payload: async (action, state, res) => {
            const json = await res.json();
            console.log(json)
            const { entities } = normalize(json, schemas.bookSchema);
            return entities;
          },
          meta: { actionType: 'GET_ONE' }
        },
        types.BOOKS_FAILURE]
}));

const addBook = (book) => (dispatch) => dispatch(createAction({
    endpoint: 'http://localhost:5000/books/',
    method: 'POST',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  types: [
    types.BOOKS_REQUEST,
    {
      type: types.ADD_BOOK,
      payload: async (action, state, res) => {
        const json = await res.json();
        console.log(json)
        const { entities } = normalize(json, schemas.bookSchema);
        return entities;
      },
      meta: { actionType: 'GET_ONE' }
    },
    types.BOOKS_FAILURE]
}));

const addToFavorites = (bookId) => (dispatch) => dispatch(createAction({
    endpoint: 'http://localhost:5000/favorites',
    method: 'POST',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({"id": bookId}),
  types: [
    types.FAVORITES_REQUEST,
    {
      type: types.ADD_BOOK,
      payload: async (action, state, res) => {
        const json = await res.json();
        const { entities } = normalize(json, schemas.favoritesSchema);
        return entities;
      },
      meta: { actionType: 'GET_ONE' }
    },
    types.FAVORITES_FAILURE]
}));


const addToWantToRead = (bookId) => (dispatch) => dispatch(createAction({
    endpoint: 'http://localhost:5000/wantToRead',
    method: 'POST',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({"id": bookId}),
  types: [
    types.WANTTOREAD_REQUEST,
    {
      type: types.WANTTOREAD_SUCCESS,
      payload: async (action, state, res) => {
        const json = await res.json();
        const { entities } = normalize(json, schemas.wantToReadsSchema)
        return entities;
      },
      meta: { actionType: 'GET_ONE' }
    },
    types.WANTTOREAD_FAILURE]
}));

const addToRead = (bookId) => (dispatch) => dispatch(createAction({
    endpoint: 'http://localhost:5000/read',
    method: 'POST',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({"id": bookId}),
  types: [
    types.READ_REQUEST,
    {
      type: types.READ_SUCCESS,
      payload: async (action, state, res) => {
        const json = await res.json();
        const { entities } = normalize(json, schemas.readsSchema)
        return entities;
      },
      meta: { actionType: 'GET_ONE' }
    },
    types.READ_FAILURE]
}));

const operations = {
    getBooks,
    deleteBook,
    editBook,
    addBook,
    addToFavorites,
    getFavorites,
    deleteFromFavorites,
    addToWantToRead,
    addToRead,
    deleteFromRead,
    deleteFromWantToRead
}

export default operations