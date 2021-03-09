import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReadList from './ReadList';

import {
    List,
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    gridList: {
        width: '35%',
        height: '70%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));


function Read() {

    const classes = useStyles();

    const [clicked, setClicked] = useState(false)

    return (
        <>
        <ListItem className={classes.listItem} button onClick={() => setClicked(prev => !prev)}>
        <ListItemText style={{ padding: 15 }}
            disableTypography
            primary={
                <>
                    <Typography gutterBottom>
                        <b>READ</b>
                    </Typography>
                </>}
            />
        </ListItem>
        {clicked ?
        <List style={{ width: '100%' }} >
            <ReadList />
        </List>
    
        : null}
    </>
    );
}



export default Read
