import _ from 'lodash';

const search = (state) => {
    const books = state.entities.books.allIds.map(id => state.entities.books.byId[id]);
    const filterBooks = books.filter(n => 
        state.entities.author.byId[n.author].name.toLowerCase().includes(state.filter.filterText.toLowerCase()) || 
        n.title.toLowerCase().includes(state.filter.filterText.toLowerCase()) ||
        n.ISBN.includes(state.filter.filterText)
        )
    if(state.filter.filterSort) {
        return _.sortBy(filterBooks, b => b[state.filter.filterSort])
    } else {
        return filterBooks
    }
}

const getAuthorName = (state, authorId) => {
    const authors = state.entities.author.allIds.map(id => state.entities.author.byId[id]);
    return authors.filter(a => a.id === authorId).map(a => a.name)[0]
}


const getPublisher = (state, publisherId) => {
    const publishers = state.entities.publisher.allIds.map(id => state.entities.publisher.byId[id]);
    return publishers.filter(p => p.id === publisherId).map(p => p.name)[0]
}

const findBookById = (state, id) => {
    return state.entities.books.byId[id]
}

const authors = (state) => state.entities.author.allIds.map(id => state.entities.author.byId[id]);

const isBookEdited = (state, bookId) => state.edit.currentlyEditedBookId && state.edit.currentlyEditedBookId === bookId;
const isBookOpened = (state, bookId) => state.edit.currentlyOpenBookId && state.edit.currentlyOpenBookId === bookId;
const publishers = (state) => state.entities.publisher.allIds.map(id => state.entities.publisher.byId[id]);

const isInFavorites = (state, bookId) => {
    return state.entities.favorites.allIds.includes(bookId.toString())
}


const selectors = { 
    search, 
    findBookById, 
    isBookEdited, 
    isBookOpened, 
    getPublisher,
    publishers,
    getAuthorName,
    authors,
    isInFavorites
 }

export default selectors;
