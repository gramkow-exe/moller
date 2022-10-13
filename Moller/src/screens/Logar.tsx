
import React, { useContext, useEffect, useState } from "react";
import AppCtx from "../Context";
import Login from "./Login";
import Register from "./Register";

export default function Logar() {
    const {showLogin,
        setShowLogin} = useContext(AppCtx);

    useEffect(()=>{
    }, [showLogin])
  
  return (
    <>
        {showLogin ? <Login/> : <Register/>}
    </>
  );
}
