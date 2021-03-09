import React, { useState } from 'react';
import { Formik } from 'formik';
import { connect } from "react-redux";
import {
    TextField,
    Button,
    Select,
    FormControl,
    InputLabel,
} from '@material-ui/core';

import selectors from '../../state/ducks/books/selectors';
import operations from '../../state/ducks/books/operations';

const validation = (values) => {
    const errors = {};
    if (
        !/^[A-za-z][A-za-z\s]*$/.test(values.author)
    ) {
        errors.author = 'Invalid name';
    } else if (
        !/^[-]*[0-9]+$/.test(values.year)
    ) {
        errors.year = 'Invalid year';
    } else if (
        !/^[0-9]{3}[-][0-9]{2}[-][0-9]{4}[-][0-9]{3}[-][0-9]$/.test(values.ISBN)
    ) {
        errors.ISBN = 'Invalid ISBN';
    }

    return errors;
}


function EditBook({ book, editBook, authors, publishers }) {

    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');

    return (
        <div className="Edit" style={{ display: 'flex', flexWrap: 'wrap'}}>
            <FormControl variant="outlined" style={{ margin: '1%', minWidth: '30%' }}>
                <InputLabel htmlFor="outlined-age-native-simple" color="secondary">Choose author</InputLabel>
                <Select
                    native
                    value={author}
                    label="Choose author"
                    inputProps={{
                        name: 'Choose author',
                        id: 'outlined-age-native-simple',
                    }}
                    onChange={(e) => setAuthor(e.target.value)}
                    color="secondary"
                >
                    <option aria-label="None" value="" />
                    {authors.map(a => <option key={a.id} value={`${JSON.stringify(a)}`}>{a.name}</option>)}
                </Select>
            </FormControl>
            <FormControl variant="outlined" style={{ margin: '1%', minWidth: '30%' }}>
                <InputLabel htmlFor="outlined-age-native-simple" color="secondary">Choose publisher</InputLabel>
                <Select
                    native
                    value={publisher}
                    label="Choose publisher"
                    inputProps={{
                        name: 'Choose publisher',
                        id: 'outlined-age-native-simple',
                    }}
                    onChange={(e) => setPublisher(e.target.value)}
                    color="secondary"
                >
                    <option aria-label="None" value="" />
                    {publishers.map(p => <option key={p.id} value={`${JSON.stringify(p)}`}>{p.name}</option>)}
                </Select>
            </FormControl>
            <Formik
                initialValues={{
                    title: book.title,
                    pages: book.pages,
                    ISBN: book.ISBN,
                    genre: book.genre,
                    country: book.country,
                    language: book.language,
                    year: book.year
                }}
                validate={validation}
                onSubmit={(values, { resetForm }) => {
                    if (author !== '') {
                        values.author = JSON.parse(author);
                    }
                    if (publisher !== '') {
                        values.publisher = JSON.parse(publisher);
                    }
                    editBook(book.id, values)
                    resetForm({
                        values: { ...values }
                    })
                }}
            >
                {formProps => (<form onSubmit={formProps.handleSubmit}>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <TextField
                            id="title"
                            label="Title"
                            variant="outlined"
                            color="secondary"
                            onChange={formProps.handleChange}
                            value={formProps.values.title}
                            style={{ width: '46%', margin: '1%', float: 'left' }}
                        />
                        <TextField
                            id="pages"
                            label="Pages"
                            variant="outlined"
                            color="secondary"
                            onChange={formProps.handleChange}
                            value={formProps.values.pages}
                            style={{ width: '18%', margin: '1%', float: 'left' }}
                        />
                        <TextField
                            id="ISBN"
                            label="ISBN"
                            variant="outlined"
                            color="secondary"
                            onChange={formProps.handleChange}
                            helperText={formProps.errors.ISBN}
                            error={formProps.errors.ISBN ? true : false}
                            value={formProps.values.ISBN}
                            style={{ width: '18%', margin: '1%', float: 'left' }}
                        />
                        <TextField
                            id="genre"
                            label="Genre"
                            variant="outlined"
                            color="secondary"
                            onChange={formProps.handleChange}
                            value={formProps.values.genre}
                            style={{ width: '18%', margin: '1%', float: 'left' }}
                        />
                        <TextField
                            id="Country"
                            label="Country"
                            variant="outlined"
                            color="secondary"
                            onChange={formProps.handleChange}
                            value={formProps.values.country}
                            style={{ width: '18%', margin: '1%', float: 'left' }}
                        />
                        <TextField
                            id="language"
                            label="Language"
                            variant="outlined"
                            color="secondary"
                            onChange={formProps.handleChange}
                            value={formProps.values.language}
                            style={{ width: '18%', margin: '1%', float: 'left' }}
                        />
                        <TextField
                            id="year"
                            label="Year"
                            variant="outlined"
                            color="secondary"
                            helperText={formProps.errors.year}
                            error={formProps.errors.year ? true : false}
                            onChange={formProps.handleChange}
                            value={formProps.values.year}
                            style={{ width: '18%', margin: '1%', float: 'left' }}
                        />
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => formProps.resetForm({ values: formProps.initialValues })}
                            style={{ margin: 15, width: '5%' }}
                        >
                            Reset
                    </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            type="submit"
                            disabled={Object.keys(formProps.errors).length === 0 ? false : true}
                            style={{ margin: 15, width: '5%' }}
                        >
                            Save
                    </Button>
                    </div>
                </form>)}

            </Formik>
        </div>)
}


const mapStateToProps = (state, ownProps) => ({
    book: selectors.findBookById(state, ownProps.id),
    authors: selectors.authors(state),
    publishers: selectors.publishers(state),
    getAuthorName: (id) => selectors.getAuthorName(state, id),
    getPublisher: (id) => selectors.getPublisher(state, id)
});

const mapDispatchToProps = (dispatch) => {
    return {
        editBook: (id, book) => {
            dispatch(operations.editBook(id, book))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);
