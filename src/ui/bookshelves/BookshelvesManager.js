import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Favorites from './Favorites';
import WantToRead from './WantToRead';
import Read from './Read';

import {
    List
} from '@material-ui/core';

import operations from '../../state/ducks/bookshelves/operations';


function Bookshelves({ fetchFavorites,fetchWantToRead, fetchRead }) {

    useEffect(() => {
        fetchFavorites();
        fetchWantToRead();
        fetchRead();
    }, [fetchFavorites, fetchWantToRead, fetchRead]);


    return (
        <div style={{ marginTop: '1%', margin: '2%', display: 'flex', justifyContent: 'center' }} className="Bookshelves">
             <List style={{ width: '100%' }} >
                 <Favorites />
                 <WantToRead />
                 <Read />
            </List>
        </div>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchFavorites: () => {
            dispatch(operations.getFavorites());
        },
        fetchWantToRead: () => {
            dispatch(operations.getWantToRead());
        },
        fetchRead: () => {
            dispatch(operations.getRead());
        }
    }
}


export default connect(null, mapDispatchToProps)(Bookshelves)