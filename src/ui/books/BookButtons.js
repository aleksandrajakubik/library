import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    IconButton
} from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import actions from '../../state/ducks/books/actions';
import operations from '../../state/ducks/books/operations';
import selectors from '../../state/ducks/books/selectors';


function BookButtons({ book, deleteBook, setEdited, addToFavorites, isInFavorites, deleteFromFavorites, addToWantToRead, addToRead, deleteFromRead, deleteFromWantToRead }) {

    const [clicked, setClicked] = useState(isInFavorites(book.id))

    return (
        <>
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => {deleteBook(book.id); deleteFromFavorites(book.id); deleteFromRead(book.id); deleteFromWantToRead(book.id)}}
                style={{ margin: 5 }}
            >
                Delete
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEdited(book.id)}
                style={{ margin: 5 }}
            >
                Edit
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                style={{ margin: 5 }}
                onClick={() => addToWantToRead(book.id)}
            >
                Want To Read
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                style={{ margin: 5 }}
                onClick={() => addToRead(book.id)}
            >
                Read
            </Button>
            <IconButton
                aria-label="favorite"
                color="secondary"
                onClick={() => { clicked ? deleteFromFavorites(book.id) : addToFavorites(book.id); setClicked(prev => !prev) }}
            >
                {clicked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
        </>
    );
}

const mapStateToProps = (state) => ({
    isInFavorites: (id) => selectors.isInFavorites(state, id)
})

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBook: (id) => {
            dispatch(operations.deleteBook(id))
        },
        addToFavorites: (bookId) => {
            dispatch(operations.addToFavorites(bookId))
        },
        deleteFromFavorites: (bookId) => {
            dispatch(operations.deleteFromFavorites(bookId))
        },
        deleteFromRead: (bookId) => {
            dispatch(operations.deleteFromRead(bookId))
        },
        deleteFromWantToRead: (bookId) => {
            dispatch(operations.deleteFromWantToRead(bookId))
        },
        addToWantToRead: (bookId) => {
            dispatch(operations.addToWantToRead(bookId))
        },
        addToRead: (bookId) => {
            dispatch(operations.addToRead(bookId))
        },
        setEdited: (id) => dispatch(actions.onSetEdit(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BookButtons)