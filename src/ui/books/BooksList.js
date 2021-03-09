import React from 'react';
import { connect } from 'react-redux';
import Book from './Book';

import selectors from '../../state/ducks/books/selectors';


function BookList({ search }) {
    
    return search.map(b => <Book key={b.id} book={b} />)
}

const mapStateToProps = (state) => ({
    search: selectors.search(state)

})



export default connect(mapStateToProps, null)(BookList)