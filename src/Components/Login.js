import React from "react";
import { GoogleLogin } from "react-google-login";
import { Button } from "@material-ui/core";
import Icon from "./Auth/Icon";
import useStyles from "./Auth/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const clientId =
  "484328789698-0ono3atut31elbb92jjvghbb1rh3e791.apps.googleusercontent.com";
function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const clases = useStyles();
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

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
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
  );
}
export default Login;
