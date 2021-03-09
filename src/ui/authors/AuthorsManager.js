import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Author from './Author';

import {
    List,
    TextField,
    Select,
    FormControl,
    InputLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel
} from '@material-ui/core';

import selectors from '../../state/ducks/authors/selectors';
import actions from '../../state/ducks/authors/actions';
import operations from '../../state/ducks/authors/operations';


import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: '1%',
        minWidth: '10%',
        float: 'left'
    },
}));

function AuthorsManager({ status,  fetchBooks, search, setFilterText, setFilterSort, sort, setFilterStatus, fetchFavorites }) {

    useEffect(() => {
        fetchFavorites()
        fetchBooks();
    }, [fetchFavorites, fetchBooks]);

    const classes = useStyles();

    return (
        <div style={{ marginTop: '1%', margin: '2%', display: 'flex', justifyContent: 'center' }} className="AuthorList">
            <List style={{ width: '100%' }} >
                <TextField
                    id="outlined-basic"
                    label="Search by name"
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
                        <option value={'name'}>Name</option>
                        <option value={'age'}>Age</option>
                        <option value={'written_books'}>Written books</option>
                    </Select>
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" color="secondary">Status</FormLabel>
                    <RadioGroup row aria-label="status" name="status" value={status} onChange={(e) => setFilterStatus(e.target.value)}>
                        <FormControlLabel value="all" control={<Radio />} label="All" />
                        <FormControlLabel value="alive" control={<Radio />} label="Alive" />
                        <FormControlLabel value="dead" control={<Radio />} label="Dead" />
                    </RadioGroup>
                </FormControl>

                {search.map(a => <Author key={a.id} author={a} />)}
            </List>
        </div>
    );
}

const mapStateToProps = (state) => ({
    search: selectors.search(state),
    sort: state.filterAuthor.filterSort,
    status: state.filterAuthor.filterStatus

});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBooks: () => {
            dispatch(operations.getBooks());
        },
        fetchFavorites: () => {
            dispatch(operations.getFavorites());
        },
        setFilterText: (text) => dispatch(actions.onSetFilterText(text)),
        setFilterSort: (sort) => dispatch(actions.onSetFilterSort(sort)),
        setFilterStatus: (status) => dispatch(actions.onSetFilterStatus(status))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthorsManager)