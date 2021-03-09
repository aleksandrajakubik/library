import types from "./types";

const onSetOpenAuthor = (id) => dispatch => {
    dispatch({
        type: types.SET_OPENED_AUTHOR_ID,
        payload: id
    })
}

const onSetFilterText = (text) => dispatch => {
    dispatch({
        type: types.SET_FILTER_AUTHOR_TEXT,
        payload: text
    })
}

const onSetFilterSort = (sort) => dispatch => {
    dispatch({
        type: types.SET_FILTER_AUTHOR_SORT,
        payload: sort
    })
}

const onSetFilterStatus = (sort) => dispatch => {
    dispatch({
        type: types.SET_FILTER_AUTHOR_STATUS,
        payload: sort
    })
}



const actions = { onSetOpenAuthor, onSetFilterSort, onSetFilterText, onSetFilterStatus };

export default actions;