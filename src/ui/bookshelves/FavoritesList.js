import React from 'react';
import { connect } from 'react-redux';
import Book from './Book';


import selectors from '../../state/ducks/bookshelves/selectors';
import operations from '../../state/ducks/bookshelves/operations';


function FavoritesList({ favorites, deleteBook }) {
    
    return (
        favorites.map(f => <Book key={f.id} book={f} deleteBook={deleteBook}/>)
    )
}

const mapStateToProps = (state) => ({
    favorites: selectors.favorites(state),
});

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBook: (id) => {
            dispatch(operations.deleteFromFavorites(id))
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(FavoritesList)
