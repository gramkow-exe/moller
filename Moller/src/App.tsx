import { useState, createContext  } from "react";
import Home from "./screens/Home";
import "./styles/main.css"
import Menus from "./components/Menus";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import  User  from "./screens/User";
import Login from "./screens/Login";
import AppCtx from "./Context";

function App() {

  const [email, setEmail] = useState("")
  const [nome, setNome] = useState("")
  const [avatar, setAvatar] = useState("")


  return (
    <AppCtx.Provider value={{
      nome, setNome,
      email, setEmail,
      avatar, setAvatar
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            localStorage.getItem("token") ? <Home /> : <Login/>} />
        </Routes>
      </BrowserRouter>
    </AppCtx.Provider>
  );
}

export default App;
