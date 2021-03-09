import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    IconButton
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import BookDialog from './BookDialog';

import { makeStyles } from '@material-ui/core/styles';

import selectors from '../../state/ducks/authors/selectors';
import actions from '../../state/ducks/authors/actions';



const useStyles = makeStyles(() => ({
    listItem: {
        '&:hover': {
            backgroundColor: '#F5F5F5'
        }
    }
}));


function Author({ author, isOpened, setOpened, authorsBook }) {

    const classes = useStyles();
    const [openBook, setOpenBook] = useState(false)

    return (
        <>
        <ListItem className={classes.listItem}>
        <img src={author.img_url} alt={author.name} height={300} width={200} />
        <ListItemText style={{ padding: 15 }}
            disableTypography
            primary={
                <>
                    <Typography gutterBottom>
                        <b>Name</b>: {author.name}
                    </Typography>
                    <Typography gutterBottom>
                        <b>Age</b>: {author.age}
                    </Typography>
                    <Typography gutterBottom>
                        <b>Books</b>: {authorsBook(author.id).length}
                    </Typography>
                </>}
            />
            {isOpened(author.id) ?
                <IconButton color="secondary" aria-label="upload picture" component="span" onClick={() => setOpened(author.id)}>
                    <ExpandLess />
                </IconButton> :
                <IconButton color="secondary" aria-label="upload picture" component="span" onClick={() => setOpened(author.id)}>
                    <ExpandMore />
                </IconButton>
            }
        </ListItem>
        {isOpened(author.id) ?
        <div style={{ float: 'left', marginLeft: 225, textAlign: 'start'}}>
            <b>Book list:</b>
            <List style={{ width: '100%' }} >
            {authorsBook(author.id).map(book => 
            <ListItem key={book.id} button onClick={() => setOpenBook(book)}>
            <ListItemText >
                <i>{book.title}</i>
            </ListItemText>
            </ListItem>
            )}
            </List>
        </div>
        : null}
        {openBook ? <BookDialog book={openBook} handleClose={() => setOpenBook(false)}/>: null}
    </>
    );
}

const mapStateToProps = (state) => ({
    isOpened: (id) => selectors.isAuthorOpened(state, id),
    authorsBook: (id) => selectors.getAuthorsBook(state, id)
})

const mapDispatchToProps = (dispatch) => {
    return {
        setOpened: (id) => dispatch(actions.onSetOpenAuthor(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Author)