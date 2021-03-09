import React from 'react';
import { connect } from 'react-redux';
import Book from './Book';


import selectors from '../../state/ducks/bookshelves/selectors';
import operations from '../../state/ducks/bookshelves/operations';


function WantToReadList({ wantToRead, deleteBook }) {
    
    return (
        wantToRead.map(f => <Book key={f.id} book={f} deleteBook={deleteBook}/>)
    )
}

const mapStateToProps = (state) => ({
    wantToRead: selectors.wantToRead(state),
});

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBook: (id) => {
            dispatch(operations.deleteFromWantToRead(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WantToReadList)
