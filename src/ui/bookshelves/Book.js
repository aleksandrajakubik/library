import React from 'react';
import { connect } from 'react-redux';
import {
    ListItem,
    ListItemText,
    Typography,
    IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import selectors from '../../state/ducks/bookshelves/selectors';

function Book({ book, getAuthorName, deleteBook }) {


    return (
        <>
            <ListItem >
                <img src={book.img_url} alt={book.title} height={150} width={100} />
                <ListItemText style={{ padding: 15 }}
                    disableTypography
                    primary={
                        <>
                            <Typography gutterBottom>
                                <b>Author</b>: {getAuthorName(book.author)}
                            </Typography>
                            <Typography gutterBottom>
                                <b>Title</b>: {book.title}
                            </Typography>
                            <Typography gutterBottom>
                                <b>Pages</b>: {book.pages}
                            </Typography>
                        </>}
                />
                <IconButton aria-label="delete" onClick={() => deleteBook(book.id)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </ListItem>
        </>
    );
}

const mapStateToProps = (state) => ({
    favorites: selectors.favorites(state),
    getAuthorName: (id) => selectors.getAuthorName(state, id)
});



export default connect(mapStateToProps, null)(Book)