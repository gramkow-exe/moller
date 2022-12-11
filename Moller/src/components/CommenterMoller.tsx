import React, { useContext, useState } from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import AppCtx from "../Context";
import { criarComment, gravarPost } from "../api";
import Comment from "./Comment";
interface Props{
  id: number,
  comments:Array<Comment>
}

interface Comment{
  content: string,
  author: Author
}
interface Author{
  name: String,
  email: string,
  avatar: string
}

export default function CommenterMoller(props:Props) {
  const { nome, setNome, email, setEmail, avatar, setAvatar, id } =
    useContext(AppCtx);
  const [content, setContent] = useState("");

  

  async function gravar() {
    const data = await criarComment(props.id, id, content);
    if (data){
      let newComment =  data
      props.comments.push(newComment)
      window.location.reload()
    }
    setContent("");
  }
  
  return (
    <div className="flex m-2">
      <div className="h-10">
        <img className="rounded-full w-10" src={avatar} />
      </div>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          style={{ resize: "none" }}
          
          className="p-2 w-9/12 sm:w-11/12 h-8 sm:h-12 ml-2 rounded-md transition-all bg-transparent border-2 border-fuchsia-400/80"
        ></textarea>
      <div className="mr-5 justify-end flex">
        {!(content == null) && !(content == "") ? (
          <button
            className="bg-fuchsia-500 rounded text-sm h-8 sm:h-12 p-2 ml-2"
            onClick={gravar}
          >
            gravar
          </button>
        ) : null}
      </div>
    </div>
  );
}
