import React, { useContext, useState } from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import AppCtx from "../Context";
import { gravarPost } from "../api";

export default function InputMoller() {
  const { nome, setNome, email, setEmail, avatar, setAvatar } =
    useContext(AppCtx);
  const [content, setContent] = useState("");

  async function gravar() {
    await gravarPost(content, email);
    setContent("");
    window.location.reload();
  }
  return (
    <div>
      <div className="flex items-center h-20 ">
        <img className="rounded-full w-10" src={avatar} />
        <p className="ml-4 text-md sm:text-lg">O que voce está pensando?</p>
      </div>
      <div>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          style={{ resize: "none" }}
          
          className="p-2 w-9/12 sm:w-11/12 h-14 sm:h-28 ml-14 rounded-md transition-all bg-transparent border-2 border-fuchsia-400/80"
        ></textarea>
      </div>
      <div className="mr-5 justify-end flex">
        {!(content == null) && !(content == "") ? (
          <button
            className="bg-fuchsia-500 rounded p-2"
            onClick={gravar}
          >
            gravar
          </button>
        ) : null}
      </div>
    </div>
  );
}
