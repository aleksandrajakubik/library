import React, { useState } from 'react';
import { Formik } from 'formik';
import { connect } from "react-redux";
import {
    TextField,
    Button,
    Select,
    FormControl,
    InputLabel
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

import selectors from '../../state/ducks/books/selectors';
import AddPublisher from './AddPublisher';


const validation = (values) => {
    const errors = {};
    if (
        !/^[A-za-z][A-za-z\s]*$/.test(values.author)
    ) {
        errors.author = 'Invalid name';
    }
    return errors;
}


function AddAuthor({ authors }) {

    const [author, setAuthor] = useState('');
    const [next, setNext] = useState(false);
    const [status, setStatus] = useState('');

    return (
        <>
            {next ? <AddPublisher author={author} setNextAuthor={setNext} /> :
                <div className="AddAuthor">
                    <h2 style={{ margin: '1%' }}>Select from existing authors</h2>
                    <FormControl variant="outlined" style={{ margin: '1%', minWidth: '20%' }}>
                        <InputLabel htmlFor="outlined-age-native-simple" color="secondary">Choose author</InputLabel>
                        <Select
                            native
                            value={author}
                            label="Choose author"
                            variant="outlined"
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
                    <h2 style={{ margin: '1%' }}>Or add a new author</h2>
                    <Formik
                        initialValues={{
                            name: '',
                            img_url: '',
                            age: ''
                        }}
                        validate={validation}
                        onSubmit={(values, { resetForm }) => {
                            values.id = uuidv4();
                            values.status = status;
                            if (author === '') {
                                setAuthor(JSON.stringify(values))
                            }
                            resetForm({
                                values: ''
                            })
                            setNext(true)
                        }}
                    >
                        {formProps => (<form onSubmit={formProps.handleSubmit}>
                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    variant="outlined"
                                    color="secondary"
                                    helperText={formProps.errors.author}
                                    error={formProps.errors.author ? true : false}
                                    onChange={formProps.handleChange}
                                    value={formProps.values.name}
                                    style={{ width: '48%', margin: '1%', float: 'left' }}
                                />
                                <TextField
                                    id="age"
                                    label="Age"
                                    variant="outlined"
                                    color="secondary"
                                    helperText={formProps.errors.age}
                                    onChange={formProps.handleChange}
                                    value={formProps.values.age}
                                    style={{ width: '48%', margin: '1%', float: 'left' }}
                                />
                                <FormControl variant="outlined" style={{ margin: '1%', minWidth: '20%' }}>
                                    <InputLabel htmlFor="outlined-age-native-simple" color="secondary">Status</InputLabel>
                                    <Select
                                        native
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        label="Status"
                                        inputProps={{
                                            name: 'Status',
                                            id: 'status',
                                        }}
                                        color="secondary"
                                    >
                                        <option aria-label="None" value="" />
                                        <option value={'alive'}>Alive</option>
                                        <option value={'dead'}>Dead</option>
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="img_url"
                                    label="img url"
                                    variant="outlined"
                                    color="secondary"
                                    onChange={formProps.handleChange}
                                    value={formProps.values.img_url}
                                    style={{ width: '48%', margin: '1%', float: 'left' }}
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
                                    Next
                    </Button>
                            </div>
                        </form>)}

                    </Formik>
                </div>}
        </>)
};

const mapStateToProps = (state) => ({
    authors: selectors.authors(state),
});

export default connect(mapStateToProps, null)(AddAuthor);
