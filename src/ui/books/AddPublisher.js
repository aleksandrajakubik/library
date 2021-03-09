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
import {v4 as uuidv4} from 'uuid';

import selectors from '../../state/ducks/books/selectors';
import AddBook from './AddBook';


function AddPublisher({ publishers, author, setNextAuthor }) {

    const [publisher, setPublisher] = useState('');
    const [next, setNext] = useState(false)

    return (
        <>
        {next ? <AddBook author={author} publisher={publisher} setNext={setNextAuthor}/> :
        <div className="AddPublisher">
            <h2 style={{ margin: '1%' }}>Select from existing publisher</h2>
            <FormControl variant="outlined" style={{ margin: '1%', minWidth: '20%' }}>
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
            <h2 style={{ margin: '1%' }}>Or add a new publisher</h2>
            <Formik
                initialValues={{
                    name: '',
                    img_url: ''
                }}
                onSubmit={(values, { resetForm }) => {
                    values.id = uuidv4();
                    if (publisher === '') {
                        setPublisher(JSON.stringify(values))
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
    publishers: selectors.publishers(state),
});

export default connect(mapStateToProps, null)(AddPublisher);
