import React, { useState } from 'react';
import { connect } from 'react-redux'
import style from './style';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { logoutUser } from '../../redux/actions/LoginActions'
import Icon from '@material-ui/core/Icon'

const Appbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = style();
  const history = useHistory()

  const handleLogout = () => {
    handleMenuClose()
    props.logoutUser()
    history.push("/login")
  }

  const redirectHome = () => {
    history.push("/")
  }
  const redirectprofile = () => {
    handleMenuClose()
    history.push("/perfil")
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
            <Typography>
            </Typography>
            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <Icon>menu</Icon>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem>Hola, {props.name} {props.lastName}</MenuItem>
              <MenuItem onClick={redirectprofile}>Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
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

export default connect(mapStateToProps, mapDispatchToProps)(Appbar)