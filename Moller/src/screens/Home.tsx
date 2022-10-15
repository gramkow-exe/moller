import React, { useContext, useEffect, useState } from "react";
import {loadPosts, validateToken} from "../api";
import InputMoller from "../components/InputMoller";
import Menus from "../components/Menus";
import Post from "../components/Post"
import AppCtx from "../Context";

interface Post{
  content: String,
  data: String
  author: Author
}

interface Author{
  name: String,
  avatar: string
}

interface User{
  email: string,
  password: string,
  name: string,
  avatar: string
}

export default function Home() {
  const {nome, setNome, email, setEmail, avatar, setAvatar} = useContext(AppCtx);
  const [posts, setPosts] = useState<Post[]>([] as Post[])

  useEffect(()=>{
    loadPage()
  },[])

  async function loadPage(){
    let user: User | null = await validateToken(localStorage.getItem("token") || "")
    if (user != null){
      if(setNome != undefined){
        setNome(user.name)
      }
      if(setEmail != undefined){
        setEmail(user.email)
      }
      if(setAvatar != undefined){
        setAvatar(user.avatar)
      }
    }
    setPosts(await loadPosts())

  }
  return (
    <div className="flex">
      <div className="w-3/12 sm:w-1/5">
        <Menus/>
      </div>
      <div id="posts" className="w-9/12 sm:w-[55%] p-4 overflow-y-auto bg-scroll min-h-[100%] max-h-[100%]" style={{color:"white"}}>
      {nome}

        <InputMoller/>
        {posts && posts.map((post)=> {
          return(<Post post={post}/>)
        })}
      </div>
      <div>

      </div>
    </div>
  );
}
