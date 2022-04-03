import React, { useState, useContext, useEffect, useCallback } from "react";
import Axios from "axios";
import AuthContext from "../store/auth-context";

const UserPanel = () => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState();
  
  const getUserDetail = useCallback(() => {
    Axios.get("/users/userinfo", {
      headers: { "x-api-key": authCtx.user.token },
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  });

  useEffect(()=>{getUserDetail()}, []);

  return <h1>Hello there {user.name}</h1>;
};

export default UserPanel;
