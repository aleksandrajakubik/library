import React from 'react';
import { connect } from 'react-redux';
import {
    ListItem,
    ListItemText,
    Typography,
    IconButton
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import actions from '../../state/ducks/books/actions';
import selectors from '../../state/ducks/books/selectors';
import EditBook from './EditBook';
import BookButtons from './BookButtons';

const useStyles = makeStyles(() => ({
    listItem: {
        '&:hover': {
            backgroundColor: '#F5F5F5'
        }
    }
}));


function Book({ book, author, publisher, isOpened, setOpened, isEdited }) {

    const classes = useStyles();

    return (
        <>
            <ListItem className={classes.listItem}>
                <img src={book.img_url} alt={book.title} height={150} width={100} />
                <ListItemText style={{ padding: 15 }}
                    disableTypography
                    primary={
                        <>
                            <Typography gutterBottom>
                                <b>Author</b>: {author(book.author)}
                            </Typography>
                            <Typography gutterBottom>
                                <b>Title</b>: {book.title}
                            </Typography>
                            <Typography gutterBottom>
                                <b>Pages</b>: {book.pages}
                            </Typography>
                            <Typography gutterBottom>
                                <b>Publisher</b>: {publisher(book.publisher)}
                            </Typography>
                        </>}
                />
                <BookButtons book={book} />
                {isOpened(book.id) ?
                    <IconButton color="secondary" aria-label="upload picture" component="span" onClick={() => setOpened(book.id)}>
                        <ExpandLess />
                    </IconButton> :
                    <IconButton color="secondary" aria-label="upload picture" component="span" onClick={() => setOpened(book.id)}>
                        <ExpandMore />
                    </IconButton>
                }
            </ListItem>
            {isOpened(book.id) ?
                <div style={{ float: 'left', marginLeft: 125, textAlign: 'start' }}>
                    <Typography gutterBottom>
                        <b>ISBN</b>: {book.ISBN}
                    </Typography>
                    <Typography gutterBottom>
                        <b>Country</b>: {book.country}
                    </Typography>
                    <Typography gutterBottom>
                        <b>Language</b>: {book.language}
                    </Typography>
                    <Typography gutterBottom>
                        <b>Year</b>: {book.year}
                    </Typography>
                    <Typography gutterBottom>
                        <b>Genre</b>: {book.genre}
                    </Typography>
                </div>
                : null
            }
            { isEdited(book.id) ? <EditBook id={book.id} /> : null}
        </>
    );
}

const mapStateToProps = (state) => ({
    isEdited: (id) => selectors.isBookEdited(state, id),
    isOpened: (id) => selectors.isBookOpened(state, id),
    author: (id) => selectors.getAuthorName(state, id),
    publisher: (id) => selectors.getPublisher(state, id)
})

const mapDispatchToProps = (dispatch) => {
    return {
        setOpened: (id) => dispatch(actions.onSetOpen(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Book)