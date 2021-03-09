import types from './types';


const initialFilterState = {
    filterText: "",
    filterSort: ""
}

const filter = (state = initialFilterState, action) => {

    switch (action.type) {

        case types.SET_FILTER_TEXT: {
            return {
                ...state,
                filterText: action.payload
            }
        }

        case types.SET_FILTER_SORT: {
            return {
                ...state,
                filterSort: action.payload
            }
        }

        default: return state
    }

}

const initialEditState = {
    currentlyEditedBookId: null,
    currentlyOpenBookId: null
}

const edit = (state = initialEditState, action) => {

    switch (action.type) {

        case types.SET_EDITED_BOOK_ID: {
            return {
                currentlyOpenBookId: null,
                currentlyEditedBookId: action.payload === state.currentlyEditedBookId ? false : action.payload
            }

        }

        case types.SET_OPENED_BOOK_ID: {
            return {
                currentlyEditedBookId: null,
                currentlyOpenBookId: action.payload === state.currentlyOpenBookId ? false : action.payload
            }
        }

        default: return state
    }
}

const visibilityReducer = { filter };
const editReducer = { edit }

export { visibilityReducer, editReducer } 