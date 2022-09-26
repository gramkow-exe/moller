import React from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Raven from "../raven.png"

export default function Menus() {
  return (
    <div className="bg-neutral-900 h-screen w-1/5
     flex flex-col items-center border-r-fuchsia-400 fixed border-r-2">

      <p className="text-fuchsia-400 font-bold mt-16 logo text-4xl">Moller</p>

      <div className="flex flex-col items-center justify-around h-1/5 mt-5">
        
        <Link to="/">
          <Button style={{ color: "white", width: 150 }} color="secondary" variant="outlined">
            Home
          </Button>
        </Link>
        <Link to="/Usuario">
          <Button style={{ color: "white", width: 150 }} color="secondary" variant="outlined">
            Usuario
          </Button>
        </Link>
        <Link to="/Sobre">
          <Button style={{ color: "white", width: 150 }} color="secondary" variant="outlined">
            Sobre
          </Button>
        </Link>
      </div>
    </div>
  );
}
