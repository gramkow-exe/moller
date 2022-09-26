import React, { useContext } from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import AppCtx from "../Context";

export default function InputMoller() {
  const {nome, setNome, email, setEmail, avatar, setAvatar} = useContext(AppCtx);
  return (
   <div>
        <div className="flex items-center h-20">
            <img className="rounded-full w-10" src={avatar}/>
            <p className="ml-4 text-lg">O que voce está pensando?</p>
        </div>
        <div>
            <textarea rows={5} className="w-11/12 ml-14 rounded-md transition-all bg-transparent border-2 border-fuchsia-400/80"></textarea>
        </div>
   </div>
  );
}
