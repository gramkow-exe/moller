import { AccountCircle, Password } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { loadPosts, criptografar, logar } from "../api";
import InputMoller from "../components/InputMoller";
import Menus from "../components/Menus";
import Post from "../components/Post";
import AppCtx from "../Context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {showLogin,
    setShowLogin} = useContext(AppCtx);

  async function login() {
    var senhaCriptografada = await criptografar(password);
    var token = await logar(email, senhaCriptografada);
    if (token !== ""){
        localStorage.setItem("token", token)
    }
    window.location.reload()
  }

  function showRegistroUsuario(){
    if (setShowLogin){
      setShowLogin(!showLogin)
    }
  }

  return (
    <div className=" w-full h-screen flex items-center justify-center ">
      <div className="w-30 p-6 h-3/12 bg-violet-200 flex flex-col rounded-lg">
        <label className="mt-0 mb-2 text-center">Login</label>

        <TextField
          id="outlined-name"
          label="Email"
          color="secondary"
          value={email}
          style={{marginTop:10}}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <TextField
          id="outlined-name"
          label="Password"
          type="password"
          color="secondary"
          value={password}
          style={{marginTop:10}}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="flex mt-4 justify-between">
          <Button
            className="w-3/8"
            variant="outlined"
            color="secondary"
            disabled={email == "" || password == ""}
            onClick={login}
          >
            Logar
          </Button>

          <Button
            className="w-3/8"
            variant="outlined"
            color="secondary"
            onClick={showRegistroUsuario}
          >
            Registrar
          </Button>
        </div>
      </div>
    </div>
  );
}
