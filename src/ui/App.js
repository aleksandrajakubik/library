import React from 'react';
import Nav from './Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import '../App.css';
import BooksManager from './books/BooksManager';
import AddAuthor from './books/AddAuthor';
import AuthorsManager from './authors/AuthorsManager';
import BookshelvesManager from './bookshelves/BookshelvesManager';

function App() {

  return (
    <div className="App">
      <Router>
        <Nav />
          <Switch>
            <Route path="/" exact>
              <BooksManager />
            </Route>
            <Route path="/authors">
              <AuthorsManager />
            </Route>
            <Route path="/addBook">
              <AddAuthor />
            </Route>
            <Route path="/bookshelves">
              <BookshelvesManager />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}


export default App;
