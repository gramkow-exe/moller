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
          <div className="rounded-full w-10 sm:w-14 bg-no-repeat bg-center bg-cover h-10 sm:h-14" style={{backgroundImage:`url("${post.author.avatar}")`}}></div>
            <div className="text-white ml-2">
              <p className="text-sm sm:text-lg">{post.author.name}</p>
              <p className="text-white/50 text-xs sm:text-md">{post.data.substring(0,10).split('-').reverse().join('/')}</p>
            </div>
        </div>
        <div className="mt-2">
          {post.content}

        </div>
    </div>
  );
}
