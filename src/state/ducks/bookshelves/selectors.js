
const favorites = (state) => state.entities.favorites.allIds.map(id => state.entities.books.byId[id]);

const wantToRead = (state) => state.entities.wantToRead.allIds.map(id => state.entities.books.byId[id]);

const read = (state) => state.entities.read.allIds.map(id => state.entities.books.byId[id]);

const getAuthorName = (state, authorId) => {
    const authors = state.entities.author.allIds.map(id => state.entities.author.byId[id]);
    return authors.filter(a => a.id === authorId).map(a => a.name)[0]
}

const selectors = { 
    favorites,
    getAuthorName,
    wantToRead,
    read
 }

export default selectors;
