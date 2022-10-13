import { useState, createContext  } from "react";
import Home from "./screens/Home";
import "./styles/main.css"
import Menus from "./components/Menus";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import  User  from "./screens/User";
import Login from "./screens/Login";
import AppCtx from "./Context";
import Logar from "./screens/Logar";

function App() {

  const [email, setEmail] = useState("")
  const [nome, setNome] = useState("")
  const [avatar, setAvatar] = useState("")
  const [showLogin, setShowLogin] = useState(true)
  const [showRegister, setShowRegister] = useState(false)
  


  return (
    <AppCtx.Provider value={{
      nome, setNome,
      email, setEmail,
      avatar, setAvatar,
      showLogin, setShowLogin
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            localStorage.getItem("token") ? <Home /> : <Logar/>} />
        </Routes>
      </BrowserRouter>
    </AppCtx.Provider>
  );
}

export default App;
