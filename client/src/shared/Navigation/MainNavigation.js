import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
import logo from "../../images/logo.png";

const MainNavigation = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <React.Fragment>
      <MainHeader>
        {isLoggedIn ? (
          <>
            <h1 className="main-navigation__title">
              {authCtx.user.role === "regular" && (
                <>
                  <Link to="/UserPanel">
                    {" "}
                    <img src={logo} height={40} /> Support Ticketing System
                  </Link>
                </>
              )}
              {authCtx.user.role === "admin" && (
                <Link to="/AdminPanel"> Support Ticketing System</Link>
              )}
            </h1>
          </>
        ) : (
          <h1 className="main-navigation__title">
            <Link to="/"> Support Ticketing System</Link>
          </h1>
        )}
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
