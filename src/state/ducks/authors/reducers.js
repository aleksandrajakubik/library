import types from './types';

const initialOpenState = {
    currentlyOpenAuthorId: null,
}

const openAuthor = (state = initialOpenState, action) => {

    switch (action.type) {

        case types.SET_OPENED_AUTHOR_ID: {
            return {
                currentlyOpenAuthorId: action.payload === state.currentlyOpenAuthorId ? false : action.payload
            }
        }

        default: return state
    }
}

const initialFilterState = {
    filterText: "",
    filterSort: "",
    filterStatus: "all"
}

const filterAuthor = (state = initialFilterState, action) => {

    switch (action.type) {

        case types.SET_FILTER_AUTHOR_TEXT: {
            return {
                ...state,
                filterText: action.payload
            }
        }

        case types.SET_FILTER_AUTHOR_SORT: {
            return {
                ...state,
                filterSort: action.payload
            }
        }

        case types.SET_FILTER_AUTHOR_STATUS: {
            return {
                ...state,
                filterStatus: action.payload
            }
        }

        default: return state
    }

}

const visibilityAuthorReducer = { filterAuthor }
const openAuthorReducer = { openAuthor };

export { openAuthorReducer, visibilityAuthorReducer }