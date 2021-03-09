import React, { useState } from 'react';
import { Formik } from 'formik';
import { connect } from "react-redux";
import {
    TextField,
    Button
} from '@material-ui/core';

import operations from '../../state/ducks/books/operations';

const validation = (values) => {
    const errors = {};
    if (
        !/^[-]*[0-9]+$/.test(values.year)
    ) {
        errors.year = 'Invalid year';
    }
    if (
        !/^[0-9]{3}[-][0-9]{2}[-][0-9]{4}[-][0-9]{3}[-][0-9]$/.test(values.ISBN)
    ) {
        errors.ISBN = 'Invalid ISBN';
    }
    console.log(errors)

    return errors;
}


const AddBook = ({ addBook, author, publisher, setNext }) => {
    
    const [saved, setSaved] = useState(false)
    
    return (<div className="AddBook">
        <h2 style={{ margin: '1%' }}>Add a new book</h2>
        <Formik
            initialValues={{
                title: '',
                pages: '',
                ISBN: '',
                genre: '',
                country: '',
                language: '',
                year: '',
                img_url: ''
            }}
            validate={validation}
            onSubmit={(values, { resetForm }) => {
                values.author = JSON.parse(author);
                values.publisher = JSON.parse(publisher);
                addBook(values)
                setSaved(true)
            }}
        >
            {formProps => (<form onSubmit={formProps.handleSubmit}>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <TextField
                        id="title"
                        label="Title"
                        variant="outlined"
                        color="secondary"
                        required={true}
                        disabled={saved}
                        onChange={formProps.handleChange}
                        value={formProps.values.title}
                        style={{ width: '48%', margin: '1%', float: 'left' }}
                    />
                    <TextField
                        id="pages"
                        label="Pages"
                        variant="outlined"
                        color="secondary"
                        required={true}
                        disabled={saved}
                        onChange={formProps.handleChange}
                        value={formProps.values.pages}
                        style={{ width: '23%', margin: '1%', float: 'left' }}
                    />
                    <TextField
                        id="ISBN"
                        label="ISBN"
                        variant="outlined"
                        color="secondary"
                        required={true}
                        disabled={saved}
                        helperText={formProps.errors.ISBN}
                        error={formProps.errors.ISBN ? true : false}
                        onChange={formProps.handleChange}
                        value={formProps.values.ISBN}
                        style={{ width: '23%', margin: '1%', float: 'left' }}
                    />
                    <TextField
                        id="genre"
                        label="Genre"
                        variant="outlined"
                        color="secondary"
                        required={true}
                        disabled={saved}
                        onChange={formProps.handleChange}
                        value={formProps.values.genre}
                        style={{ width: '23%', margin: '1%', float: 'left' }}
                    />
                    <TextField
                        id="country"
                        label="Country"
                        variant="outlined"
                        color="secondary"
                        required={true}
                        disabled={saved}
                        onChange={formProps.handleChange}
                        value={formProps.values.country}
                        style={{ width: '23%', margin: '1%', float: 'left' }}
                    />
                    <TextField
                        id="language"
                        label="Language"
                        variant="outlined"
                        color="secondary"
                        required={true}
                        disabled={saved}
                        onChange={formProps.handleChange}
                        value={formProps.values.language}
                        style={{ width: '11%', margin: '1%', float: 'left' }}
                    />
                    <TextField
                        id="year"
                        label="Year"
                        variant="outlined"
                        color="secondary"
                        required={true}
                        disabled={saved}
                        onChange={formProps.handleChange}
                        helperText={formProps.errors.year}
                        error={formProps.errors.year ? true : false}
                        value={formProps.values.year}
                        style={{ width: '10%', margin: '1%', float: 'left' }}
                    />
                    <TextField
                        id="img_url"
                        label="Image url"
                        variant="outlined"
                        color="secondary"
                        required={true}
                        disabled={saved}
                        onChange={formProps.handleChange}
                        value={formProps.values.img_url}
                        style={{ width: '10%', margin: '1%', float: 'left' }}
                    />
                    <Button
                        variant="outlined"
                        color="secondary"
                        disabled={saved}
                        onClick={() => formProps.resetForm({ values: formProps.initialValues })}
                        style={{ margin: 15, width: '5%' }}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                        disabled={(Object.keys(formProps.errors).length === 0 ? false : true) || saved}
                        style={{ margin: 15, width: '5%' }}
                    >
                        Save
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        disabled={!saved}
                        style={{ margin: 15, width: '5%' }}
                        onClick={() => setNext(false)}
                    >
                        Add another book
                    </Button>
                </div>
            </form>)}

        </Formik>
    </div>)
};

const mapDispatchToProps = (dispatch) => {
    return {
        addBook: (book) => {
            dispatch(operations.addBook(book))
        }
    }
}

export default connect(null, mapDispatchToProps)(AddBook);
