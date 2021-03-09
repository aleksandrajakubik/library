import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    with: '100%'
  },
});

export default function CenteredTabs() {

  const currentTab = () => {
    let path = window.location.pathname
    if (path === "/") return 0
    else if (path === "/authors") return 1
    else if (path === "/bookshelves") return 2
  }

  const classes = useStyles();
  const [value, setValue] = React.useState(currentTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor={"secondary"}
        textColor="secondary"
        centered
      >
        <Tab label="Books" component={Link} to="/" />
        <Tab label="Authors" component={Link} to="/authors"/>
        <Tab label="Bookshelves" component={Link} to="/bookshelves"/>
      </Tabs>
    </Paper>
  );
}