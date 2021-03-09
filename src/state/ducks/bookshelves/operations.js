import { createAction } from 'redux-api-middleware';
import types from "./types";
import { normalize, schema } from "normalizr";


const favoriteSchema = new schema.Entity('favorites');
const favoritesSchema = new schema.Array(favoriteSchema);

const wantToReadSchema = new schema.Entity('wantToRead');
const wantToReadsSchema = new schema.Array(wantToReadSchema);

const readSchema = new schema.Entity('read');
const readsSchema = new schema.Array(readSchema);


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

const getWantToRead = () => (dispatch) => dispatch(createAction({
    endpoint: ' http://localhost:5000/wantToRead',
    method: 'GET',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        types.WANTTOREAD_REQUEST,
        {
            type: types.WANTTOREAD_SUCCESS,
            payload: async (action, state, res) => {
                const json = await res.json();
                const { entities } = normalize(json, wantToReadsSchema);
                return entities;
            },
            meta: { actionType: 'GET_ALL' }
        },
        types.WANTTOREAD_FAILURE]
}));


const getRead = () => (dispatch) => dispatch(createAction({
    endpoint: 'http://localhost:5000/read',
    method: 'GET',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        types.READ_REQUEST,
        {
            type: types.READ_SUCCESS,
            payload: async (action, state, res) => {
                const json = await res.json();
                const { entities } = normalize(json, readsSchema);
                return entities;
            },
            meta: { actionType: 'GET_ALL' }
        },
        types.READ_FAILURE]
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


const operations = {
    getFavorites,
    deleteFromFavorites,
    getWantToRead,
    getRead,
    deleteFromWantToRead,
    deleteFromRead
}

export default operations