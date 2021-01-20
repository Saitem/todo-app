import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  btn: {
    flexGrow: 1
  },
}));

export const Header = ({logOut}) => {
  const classes = useStyles()
  const history = useHistory()

  const toSignIn = () => {
    history.push('/signIn')
  }

  return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Button 
                    className={classes.btn} 
                    color="inherit"
                    onClick={() => (
                      logOut(toSignIn)

                    )}
                >Log out</Button>
            </Toolbar>
        </AppBar>
    </div>
  );
}