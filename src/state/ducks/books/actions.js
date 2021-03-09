import types from "./types";

const onSetFilterText = (text) => dispatch => {
    dispatch({
        type: types.SET_FILTER_TEXT,
        payload: text
    })
}

const onSetFilterSort = (sort) => dispatch => {
    dispatch({
        type: types.SET_FILTER_SORT,
        payload: sort
    })
}

const onSetEdit = (id) => dispatch => {
    dispatch({
        type: types.SET_EDITED_BOOK_ID,
        payload: id
    })
}

const onSetOpen = (id) => dispatch => {
    dispatch({
        type: types.SET_OPENED_BOOK_ID,
        payload: id
    })
}



const actions = { onSetFilterText, onSetFilterSort, onSetEdit, onSetOpen };

export default actions;