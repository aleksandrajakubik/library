const SET_FILTER_TEXT = 'SET_FILTER_TEXT';
const SET_FILTER_SORT = 'SET_FILTER_SORT';
const SET_EDITED_BOOK_ID = 'SET_EDITED_BOOK_ID';
const SET_OPENED_BOOK_ID = 'SET_OPENED_BOOK_ID';

const BOOKS_REQUEST = '@@books/BOOKS_REQUEST';
const BOOKS_SUCCESS = '@@books/BOOKS_SUCCESS';
const BOOKS_FAILURE = '@@books/BOOKS_FAILURE';

const FAVORITES_REQUEST = '@@bookshelves/FAVORITES_REQUEST';
const FAVORITES_SUCCESS = '@@bookshelves/FAVORITES_SUCCESS';
const FAVORITES_FAILURE = '@@bookshelves/FAVORITES_FAILURE';

const WANTTOREAD_REQUEST = '@@bookshelves/WANTTOREAD_REQUEST';
const WANTTOREAD_SUCCESS = '@@bookshelves/WANTTOREAD_SUCCESS';
const WANTTOREAD_FAILURE = '@@bookshelves/WANTTOREAD_FAILURE';


const READ_REQUEST = '@@bookshelves/READ_REQUEST';
const READ_SUCCESS = '@@bookshelves/READ_SUCCESS';
const READ_FAILURE = '@@bookshelves/READ_FAILURE';


const DELETE_BOOK = '@@books/DELETE_BOOK';
const EDIT_BOOK = '@@books/EDIT_BOOK';
const ADD_BOOK = '@@books/ADD_BOOK';

const types = { 
    SET_FILTER_TEXT, 
    SET_FILTER_SORT, 
    SET_EDITED_BOOK_ID, 
    SET_OPENED_BOOK_ID, 
    BOOKS_REQUEST, 
    BOOKS_SUCCESS,
    BOOKS_FAILURE,
    DELETE_BOOK,
    EDIT_BOOK,
    ADD_BOOK,
    FAVORITES_REQUEST,
    FAVORITES_SUCCESS,
    FAVORITES_FAILURE,
    WANTTOREAD_REQUEST,
    WANTTOREAD_SUCCESS,
    WANTTOREAD_FAILURE,
    READ_REQUEST,
    READ_SUCCESS,
    READ_FAILURE
}

export default types