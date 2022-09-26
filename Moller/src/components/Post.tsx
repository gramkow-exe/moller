import React, { useEffect } from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Raven from "../raven.png"

interface Post{
  content: String,
  data: String,
  author: Author
}

interface Author{
  name: String,
  avatar: string
}

interface Props{
  post: Post
}

export default function Post({post}: Props) {
  
  return (
    <div className="rounded-lg border-gray-50/50 border-2 w-full h-auto min-h-80 p-4 mt-4 hover:border-fuchsia-400/50 transition-all">
        <div className="flex items-center">
            <img className="rounded-full w-14" src={post.author.avatar}></img>
            <div className="text-white ml-2">
              <p className="text-xl">{post.author.name}</p>
              <p className="text-white/50">{post.data.substring(0,10).split('-').reverse().join('/')}</p>
            </div>
        </div>
        <div className="mt-2">
          {post.content}

        </div>
    </div>
  );
}
