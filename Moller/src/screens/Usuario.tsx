import { TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {alterarUsuario, changePassword, criptografar, loadPosts, validateToken} from "../api";
import InputMoller from "../components/InputMoller";
import Menus from "../components/Menus";
import Post from "../components/Post"
import AppCtx from "../Context";

interface User{
  id: number,
  email: string,
  password: string,
  name: string,
  avatar: string
}

export default function Usuario() {
  const {nome, setNome, email, setEmail, avatar, setAvatar, id, setId} = useContext(AppCtx);

  const [emailForm, setEmailForm] = useState(email)
  const [nomeForm, setNomeForm] = useState(nome)
//   const [senhaForm, setSenhaForm] = useState(senha)
  const [avatarForm, setAvatarForm] = useState(avatar)
  const [senhaAntiga, setSenhaAntiga] = useState("")
  const [senhaNova, setSenhaNova] = useState("")

  async function alterar(){
    alterarUsuario(email, emailForm, nomeForm, avatarForm)
  }

  async function alterarSenha(){
    let senhaAntigaHash = await criptografar(senhaAntiga)
    let senhaNovaHash = await criptografar(senhaNova)
    
    await changePassword(email, senhaAntigaHash , senhaNovaHash)
    setSenhaAntiga("")
    setSenhaNova("")
  }

  return (
    <div className="h-screen w-10/12 flex flex-col justify-around items-center p-8">
      <div className="flex items-center h-20 ">
        <img className="rounded-full w-24" src={avatar} />
      </div>
      <div className="bg-fuchsia-400 h-[43%] w-7/8 sm:w-2/4 rounded-xl flex flex-col p-8">
        <TextField
          id="outlined-name"
          label="Email"
          color="secondary"
          value={emailForm}
          style={{marginTop:10}}
          onChange={(e) => {
            setEmailForm(e.target.value);
          }}
        />

        <TextField
          id="outlined-name"
          label="Nome"
          color="secondary"
          value={nomeForm}
          style={{marginTop:10}}
          onChange={(e) => {
            setNomeForm(e.target.value);
          }}
        />

        <TextField
          id="outlined-name"
          label="Avatar"
          color="secondary"
          value={avatarForm}
          style={{marginTop:10}}
          onChange={(e) => {
            setAvatarForm(e.target.value);
          }}
        />
        <div className="flex justify-center">
          <button
              className="bg-fuchsia-500 rounded p-2 w-7/8 sm:w-1/2 mt-4"
              onClick={alterar}
            >
              Alterar Informações
          </button>
        </div>
      </div>

      <div className="bg-fuchsia-400 h-2/6 w-7/8 sm:w-2/4 rounded-xl flex flex-col p-8">
        <TextField
          id="outlined-name"
          label="Senha antiga"
          color="secondary"
          type={"password"}
          value={senhaAntiga}
          style={{marginTop:10}}
          onChange={(e) => {
            setSenhaAntiga(e.target.value);
          }}
        />

        <TextField
          id="outlined-name"
          label="Senha nova"
          color="secondary"
          type={"password"}
          value={senhaNova}
          style={{marginTop:10}}
          onChange={(e) => {
            setSenhaNova(e.target.value);
          }}
        />

        <div className="flex justify-center">
          <button
              className="bg-fuchsia-500 rounded p-2 w-3/4 sm:w-1/2 mt-4"
              onClick={alterarSenha}
            >
              Alterar Senha
          </button>
        </div>
      </div>
      </div>
  );
}
