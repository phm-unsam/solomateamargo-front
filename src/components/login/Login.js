import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux'
import style from './style'
import { loginUser } from '../../redux/actions/LoginActions'
import planeIcon from '../../plane.png'
export default function Login() {
  const classes = style();
  const dispatch = useDispatch();
  const [loginCredentials, setloginCredentials] = useState({})

  const loginTry = (e) => {
    e.preventDefault()
    dispatch(loginUser(loginCredentials))
  }
  const handeImputChange = (e) => {
    const { value, name } = e.target
    setloginCredentials({ ...loginCredentials, [name]: value })
  }

  return (
    <Container component="main" maxWidth="xs">

      <CssBaseline />
      <div className={classes.paper}>
      <img alt="plane logo" src={planeIcon} height="90 rem"></img>
        <Typography component="h1" variant="h2">
          AterrizApp 
        </Typography>
        
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user"
            label="Usuario"
            name="username"
            autoComplete="user"
            onChange={handeImputChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handeImputChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loginTry}
          >
            Entrar
          </Button>
        </form>
      </div>
    </Container>
  );
}