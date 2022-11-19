import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import memoriseLogo from "../../images/memories-Logo.png";
import memoriseText from "../../images/memories-Text.png";
import useStyles from "./styles";
import decode from "jwt-decode";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function Navbar() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const clases = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar className={clases.appBar} position="static" color="inherit">
      <Link to="/" className={clases.brandContainer}>
        <img src={memoriseText} alt="icon" height="45" />
        <img
          className={clases.image}
          src={memoriseLogo}
          alt="memorise"
          height="40"
        />
      </Link>
      <Toolbar className={clases.toolbar}>
        {user ? (
          <div className={clases.profile}>
            <Avatar
              className={clases.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
              style={{ marginRight: "1rem" }}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={clases.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              className={clases.logout}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Log out
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
