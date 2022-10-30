import React, { useEffect, useContext, useState } from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Raven from "../raven.png"
import {Favorite, FavoriteBorder, ChatBubbleOutline, ChatBubble} from '@mui/icons-material';
import AppCtx from "../Context";
import { criarLike, removerLike } from "../api";
import Comment from "./Comment";
import CommenterMoller from "./CommenterMoller";

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

interface _count{
    likes: number
}

interface Author{
  name: String,
  avatar: string
}

interface Props{
  post: Post
}

interface Like{
  id: number
}

export default function Post({post}: Props) {

  const [liked, setLiked] = useState(post.likes[0]?.id != null)
  const [likes, setLikes] = useState(post._count.likes)

  const [mostrarComentarios, setMostrarComentarios] = useState(false)

  const {id} = useContext(AppCtx);

  async function handleLike(){
    if (post.likes[0]?.id == null){
      setLiked(true)
      setLikes(likes+1)
      let like = await criarLike(post.id, id)
      console.log(like)
      if (like){
        post.likes[0] = {id: like.id}
      }
      
    }else{
      removerLike(post.likes[0].id)
      post.likes = []
      setLiked(false)
      setLikes(likes-1)
    }
  }

  return (
    <>
    <div className="rounded-lg border-gray-50/50 border-2 w-full h-auto min-h-80 p-4 mt-4 hover:border-fuchsia-400/50 transition-all">
        <div className="flex items-center">
          <div className="rounded-full w-10 sm:w-14 bg-no-repeat bg-center bg-cover h-10 sm:h-14" style={{backgroundImage:`url("${post.author.avatar}")`}}></div>
            <div className="text-white ml-2">
              <p className="text-sm sm:text-lg">{post.author.name}</p>
              <p className="text-white/50 text-xs sm:text-md">{post.data.substring(0,10).split('-').reverse().join('/')}</p>
            </div>
        </div>
        <div className="mt-2">
          {post.content}
        </div>
        <div className="flex justify-between mt-2">
          <button onClick={handleLike}><>{liked?<Favorite/>:<FavoriteBorder/>} {likes}</></button>
          <button onClick={()=> setMostrarComentarios(!mostrarComentarios)}>{mostrarComentarios ? <ChatBubble/> : <ChatBubbleOutline/>}</button>
        </div>
        
    </div>
    
    {mostrarComentarios ? 
    <>
    <CommenterMoller id={post.id} comments={post.comments}/>
    {post.comments.map((i)=><Comment comment={i} id={post.id}></Comment>)}
    </>
     : null}
    
    </>
  );
}
