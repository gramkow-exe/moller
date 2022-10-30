import React, { useContext, useEffect, useState } from "react";
import {loadPosts, validateToken} from "../api";
import InputMoller from "../components/InputMoller";
import Menus from "../components/Menus";
import Post from "../components/Post"
import AppCtx from "../Context";

interface Post{
  id: number,
  content: String,
  data: String,
  author: Author,
  likes: Array<Like>,
  comments: Array<Comment>,
  _count: _count
}
interface Comment{
  content: string,
  author: Author
}
interface Comment{
  content: string,
  author: Author
}

interface _count{
    likes: number
}

interface Author{
  name: String,
  avatar: string
}

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
  const {nome, setNome, email, setEmail, avatar, setAvatar, id, setId} = useContext(AppCtx);
  const [posts, setPosts] = useState<Post[]>([] as Post[])

  useEffect(()=>{
    loadPage()
  },[])

  async function loadPage(){
    let user: User | null = await validateToken(localStorage.getItem("token") || "")
    if (user != null){

      let data = await loadPosts(user.id)
      setPosts(data)
    }
    
  }
  return (
      <div id="posts" className="w-9/12 sm:w-[55%] p-4 overflow-y-auto bg-scroll min-h-[100%] max-h-[100%]" style={{color:"white"}}>
      {nome}
        
        <InputMoller/>
        {posts && posts.map((post)=> {
          return(<Post post={post}/>)
        })}
      </div>
  );
}
