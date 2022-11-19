import React from "react";
import { GoogleLogout } from "react-google-login";
import { Button } from "@material-ui/core";
function Logout({ logout, onSignoutSuccess }) {
  const clientId =
    "484328789698-0ono3atut31elbb92jjvghbb1rh3e791.apps.googleusercontent.com";
  return (
    <GoogleLogout
      clientId={clientId}
      buttonText="Sign Out"
      onLogoutSuccess={onSignoutSuccess}
      render={(renderProps) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={logout}
          disabled={renderProps.disabled}
        >
          Log out
        </Button>
      )}
    />
  );
}

export default Logout;
