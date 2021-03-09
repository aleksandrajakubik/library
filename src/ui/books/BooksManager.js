import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BooksList from './BooksList';
import { Link } from "react-router-dom";
import {
    List,
    TextField,
    Select,
    FormControl,
    InputLabel,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import actions from '../../state/ducks/books/actions';
import operations from '../../state/ducks/books/operations';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: '1%',
        minWidth: '10%',
        float: 'left'
    },
}));


function BooksManager({ setFilterText, sort, setFilterSort, fetchBooks, fetchFavorites }) {


    useEffect(() => {
        fetchFavorites();
        fetchBooks();
    }, [fetchFavorites, fetchBooks]);

    const classes = useStyles();

    return (
        <div style={{ marginTop: '1%', margin: '2%', display: 'flex', justifyContent: 'center' }} className="BookList">
            <List style={{ width: '100%' }} >
                <TextField
                    id="outlined-basic"
                    label="Search by author, title or ISBN"
                    variant="outlined"
                    color="secondary"
                    onChange={(e) => setFilterText(e.target.value)}
                    style={{ width: '50%', margin: '1%', float: 'left' }}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple" color="secondary">Sort by</InputLabel>
                    <Select
                        native
                        value={sort}
                        onChange={(e) => setFilterSort(e.target.value)}
                        label="Sort by"
                        inputProps={{
                            name: 'Sort by',
                            id: 'outlined-age-native-simple',
                        }}
                        color="secondary"
                    >
                        <option aria-label="None" value="" />
                        <option value={'author'}>Author</option>
                        <option value={'title'}>Title</option>
                        <option value={'pages'}>Pages</option>
                    </Select>
                </FormControl>
                <Link to='/addBook'>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={{ float: 'left', marginTop: '1.5%'}}
                >
                    Add new book
                </Button>
                </Link>
                <BooksList />
            </List>
        </div>

    );
}

const mapStateToProps = (state) => ({
    books: state.books,
    sort: state.filter.filterSort,

})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBooks: () => {
            dispatch(operations.getBooks());
        },
        fetchFavorites: () => {
            dispatch(operations.getFavorites());
        },
        setFilterText: (text) => dispatch(actions.onSetFilterText(text)),
        setFilterSort: (sort) => dispatch(actions.onSetFilterSort(sort))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BooksManager)