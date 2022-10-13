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
import { loadPosts, criptografar, logar, register } from "../api";
import InputMoller from "../components/InputMoller";
import Menus from "../components/Menus";
import Post from "../components/Post";
import AppCtx from "../Context";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const {showLogin,
    setShowLogin} = useContext(AppCtx);

  function showLoginUsuario(){
    if (setShowLogin){
      setShowLogin(!showLogin)
    }
  }

  async function registrar() {
    var senhaCriptografada = await criptografar(password);
    var token = await register(email, senhaCriptografada, name, imgUrl);
    console.log(token)
    if (token !== ""){
        localStorage.setItem("token", token)
    }
    window.location.reload()
  }

  return (
    <div className=" w-full h-screen flex items-center justify-center">
      <div className="w-30 p-6 h-3/12 bg-violet-200 flex flex-col rounded-lg">
        <label className="mt-0 mb-2 text-center">Registro</label>

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

        <TextField
          id="outlined-name"
          label="Name"
          type="string"
          color="secondary"
          value={name}
          style={{marginTop:10}}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <TextField
          id="outlined-name"
          label="Image Url"
          type="string"
          color="secondary"
          value={imgUrl}
          style={{marginTop:10}}
          onChange={(e) => {
            setImgUrl(e.target.value);
          }}
        />
        <div className="flex justify-between mt-4">
          <Button
            className="w-3/8"
            variant="outlined"
            color="secondary"
            disabled={email == "" || password == ""}
            onClick={registrar}
          >
            Registro
          </Button>
          <Button
            className="w-3/8"
            variant="outlined"
            color="secondary"
            onClick={showLoginUsuario}
          >
            Logar-se
          </Button>
        </div>
      </div>
    </div>
  );
}
