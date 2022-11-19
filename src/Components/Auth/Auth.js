import React, { useState, useEffect } from "react";
import {
  Container,
  Avatar,
  Paper,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
export default function Auth() {
  const clientId =
    "484328789698-0ono3atut31elbb92jjvghbb1rh3e791.apps.googleusercontent.com";
  const init = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cPassword: "",
  };
  const clases = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSingnUp, setIsSingnUp] = useState(false);
  const [formData, setFormData] = useState(init);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (isSingnUp) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scop: "",
      });
    }
    gapi.load("client:auth2", start);
  });
  const onLoginSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };
  const switchMode = () => {
    setIsSingnUp((e) => !e);
  };
  const handelShowPassword = () => {
    setShowPassword((e) => !e);
  };
  return (
    <Container maxWidth="xs" component="main">
      <Paper className={clases.paper} elevation={3}>
        <Avatar className={clases.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSingnUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={clases.form} onSubmit={handelSubmit}>
          <Grid container spacing={2}>
            {isSingnUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  half
                  handelChange={handelChange}
                  autoFocus
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  half
                  handelChange={handelChange}
                  xs={6}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Adderss"
              handelChange={handelChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handelShowPassword={handelShowPassword}
              handelChange={handelChange}
            />
            {isSingnUp && (
              <Input
                handelChange={handelChange}
                name="cPassword"
                label="Repeat Password"
                handelShowPassword={handelShowPassword}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={clases.submit}
          >
            {isSingnUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId={clientId}
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <Button
                className={clases.googleButton}
                variant="contained"
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
              >
                Google Sign In
              </Button>
            )}
          />
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                {isSingnUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
