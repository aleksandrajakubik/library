import React from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';

import selectors from '../../state/ducks/authors/selectors';

function BookDialog({ book, handleClose, publisher }) {
  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="simple-dialog-title">{book.title}</DialogTitle>
        <ListItem >
          <img src={book.img_url} alt={book.name} height={300} width={200} />
          <ListItemText style={{ padding: 15 }}
            disableTypography
            primary={
              <>
                <Typography gutterBottom>
                  <b>Pages</b>: {book.pages}
                </Typography>
                <Typography gutterBottom>
                  <b>Publisher</b>: {publisher(book.publisher)}
                </Typography>
                <Typography gutterBottom>
                  <b>Genre</b>: {book.genre}
                </Typography>
                <Typography gutterBottom>
                  <b>Year</b>: {book.year}
                </Typography>
                <Typography gutterBottom>
                  <b>ISBN</b>: {book.ISBN}
                </Typography>
              </>}
          />
        </ListItem>
      </Dialog>
    </div>
  );
}


const mapStateToProps = (state) => ({
  publisher: (id) => selectors.getPublisher(state, id)
})



export default connect(mapStateToProps, null)(BookDialog)