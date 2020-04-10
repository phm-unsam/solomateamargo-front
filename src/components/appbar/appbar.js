import React from 'react';
import { connect } from 'react-redux'
import style from './style';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { logoutUser } from '../../redux/actions/LoginActions'

const Appbar = (props) => {
  const classes = style();
  const history = useHistory()
  
  const handleLogout = () => {
   
    props.logoutUser()
    history.push("/login")
  }

  const redirectHome = () =>{
    history.push("/")
  }
  const redirectprofile= () =>{
    history.push("/perfil")
  }
  if (!props.isLogged)
    return (<div></div>)
  else
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={redirectHome} edge="start" className={classes.menuButton} color="inherit" aria-label="menu" >
              <img src="../../plane.png" alt="logo" height="50rem"></img>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Aterrizapp
          </Typography>
            <Button color="inherit" onClick={redirectprofile}>{props.name} {props.lastName}</Button>
            <Button color="inherit" onClick={handleLogout}>Log Out</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
}

function mapStateToProps(state) {
  return { ...state.login }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logoutUser }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Appbar)