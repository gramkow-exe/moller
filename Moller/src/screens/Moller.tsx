import React, { useContext, useEffect, useState } from "react";
import {loadPosts, validateToken} from "../api";
import InputMoller from "../components/InputMoller";
import Menus from "../components/Menus";
import Post from "../components/Post"
import Home from "../screens/Home"
import AppCtx from "../Context";
import Usuario from "./Usuario";
import UserPage from "./UserPage";

interface User{
  id: number,
  email: string,
  password: string,
  name: string,
  avatar: string
}

interface Like{
  id: number
}

export default function Moller() {
  const {nome, setNome, email, setEmail, avatar, setAvatar, id, setId, aba, setAba, emailUserPage, setEmailUserPage} = useContext(AppCtx);

  
useEffect(()=> {
  if (emailUserPage != ""){
    setAba?.("userPage")
  }
}, [emailUserPage])

useEffect(()=> {
  if (aba != "userPage"){
    setEmailUserPage?.("")
  }
}, [aba])

  useEffect(()=>{
    loadPage()
  },[])

  async function loadPage(){
    let user: User | null = await validateToken(localStorage.getItem("token") || "")
    if (user != null){
        setId?.(user.id)
        setNome?.(user.name)
        setEmail?.(user.email)
        setAvatar?.(user.avatar)
    }
    
  }
  return (
    <div className="flex">
      <div className="w-3/12 sm:w-1/5">
        <Menus/>
      </div>
      {aba=="home"? <Home/>:null}
      {aba=="usuario" ?<Usuario/> : null}
      {aba=="userPage"?<UserPage email={emailUserPage}/>:null}
      
    </div>
  );
}
