import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSelector, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import style from './style'
import { loginUser } from '../../redux/actions/LoginActions'
import planeIcon from '../../plane.png'
import { useHistory } from "react-router-dom";
import SnackbarOpen from '../../components/snackbar'
import {isLoginLoading,loginHasError,loginErrorMsg} from '../../redux/selectors/loginSelectors'

const Login = ({ loginUser }) => {
  const classes = style();
  let history = useHistory();
  const isLoading = useSelector(state => isLoginLoading(state))
  const hasError = useSelector(state => loginHasError(state))
  const errorMsg = useSelector(state => loginErrorMsg(state))

  const callbackLogin = () => {

    history.push("/");
  }

  const [loginForm, setloginForm] = useState({
    username: "",
    password: "",
    callbackFn: callbackLogin
  });


  const loginTry = (e) => {
    e.preventDefault();
    loginUser(loginForm);
  }

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setloginForm({ ...loginForm, [name]: value });
  }

  const loginButtonDisabled = () => {
    return isEmpty(loginForm.password) || isEmpty(loginForm.username) || isLoading;
  }

  const isEmpty = (aField) => {
    return aField === "";
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
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleInputChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <div className={classes.wrapper}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={loginTry}
              disabled={loginButtonDisabled()}
            >
              Login
          </Button>
            {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}

          </div>
        </form>
      </div>
      <div>

      </div>
      <SnackbarOpen open={hasError} message={errorMsg} />
    </Container>
  );
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)