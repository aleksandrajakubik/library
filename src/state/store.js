import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { combineReducers } from 'redux';
import { createMiddleware } from 'redux-api-middleware';
import { visibilityReducer, editReducer } from './ducks/books/reducers';
import { openAuthorReducer, visibilityAuthorReducer } from './ducks/authors/reducers';
import entitiesReducer from './ducks/entities'

const rootReducer = combineReducers({ ...visibilityReducer, ...editReducer, ...openAuthorReducer, ...entitiesReducer, ...visibilityAuthorReducer })

const initalState = {

}

const middleware = [thunk, createMiddleware(), logger]

const store = createStore(rootReducer, initalState, applyMiddleware(...middleware))

export default store;