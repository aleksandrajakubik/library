import _ from 'lodash';

const search = (state) => {
    const authors = state.entities.author.allIds.map(id => state.entities.author.byId[id])
    const filterAuthors = authors.filter(a => 
        a.name.toLowerCase().includes(state.filterAuthor.filterText.toLowerCase()))
        .filter(a => state.filterAuthor.filterStatus !== "all" ? a.status === state.filterAuthor.filterStatus : a)
    if(state.filterAuthor.filterSort) {
        return state.filterAuthor.filterSort !== 'written_books'  ? _.sortBy(filterAuthors, a => a[state.filterAuthor.filterSort]) : 
            _.sortBy(filterAuthors, a => getAuthorsBook(state, a.id).length)
    }
    else {
        return filterAuthors
    }
}
 


const isAuthorOpened = (state, authorId) => state.openAuthor.currentlyOpenAuthorId && state.openAuthor.currentlyOpenAuthorId === authorId;
const authors = (state) => state.entities.author.allIds.map(id => state.entities.author.byId[id]);

const getAuthorsBook = (state, authorId) => {
    const books = state.entities.books.allIds.map(id => state.entities.books.byId[id]);
    const authorsBook = books.filter(b => b.author === authorId);
    return authorsBook
}

const getPublisher = (state, publisherId) => {
    const publishers = state.entities.publisher.allIds.map(id => state.entities.publisher.byId[id]);
    return publishers.filter(p => p.id === publisherId).map(p => p.name)[0]
}


const selectors = { 
    authors,
    isAuthorOpened,
    getAuthorsBook,
    getPublisher,
    search
 }

export default selectors;