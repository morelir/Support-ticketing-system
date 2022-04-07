import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Axios from "axios";
import { capitalizeFirstLetter } from "../../utils/functions";

import "./NavLinks.css";

const NavLinks = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const history = useHistory();

  const LogoutHandler = () => {
    authCtx.logout();
    // history.replace("/login");
  };

  return (
    <ul className="nav-links">
      {isLoggedIn && (
        <>
          <li>
            <div style={{ color: "#88989b" }}>
              <div style={{ textAlign: "center" }}>
                Hello, {capitalizeFirstLetter(authCtx.user.name)}
              </div>
            </div>
          </li>

          {/* {authCtx.user.role === "admin" && (
            <li>
              <NavLink to="/userManagement" exact>
                User Management
              </NavLink>
            </li>
          )} */}
          <li>
            <NavLink to="/" exact onClick={LogoutHandler}>
              Logout
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
