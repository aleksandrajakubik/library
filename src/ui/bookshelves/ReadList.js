import React from 'react';
import { connect } from 'react-redux';
import Book from './Book';


import selectors from '../../state/ducks/bookshelves/selectors';
import operations from '../../state/ducks/bookshelves/operations';


function ReadList({ read, deleteBook }) {
    
    return (
        read.map(f => <Book key={f.id} book={f} deleteBook={deleteBook}/>)
    )
}

const mapStateToProps = (state) => ({
    read: selectors.read(state),
});

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBook: (id) => {
            dispatch(operations.deleteFromRead(id))
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ReadList)
