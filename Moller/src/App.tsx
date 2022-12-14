import { useState, createContext, useEffect  } from "react";
import Moller from "./screens/Moller";
import "./styles/main.css"
import Menus from "./components/Menus";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import Login from "./screens/Login";
import AppCtx from "./Context";
import Logar from "./screens/Logar";
import { setIp } from "./api";

function App() {
  const [aba, setAba] = useState("home")
  const [id, setId] = useState(0)
  const [email, setEmail] = useState("")
  const [nome, setNome] = useState("")
  const [avatar, setAvatar] = useState("")
  const [showLogin, setShowLogin] = useState(true)
  const [showRegister, setShowRegister] = useState(false)
  const [emailUserPage, setEmailUserPage] = useState("")

  useEffect(()=> {
    setIp(window.location.href.replace("5173", "3000"))
  }, [])


  return (
    <AppCtx.Provider value={{
      aba, setAba,
      id, setId,
      nome, setNome,
      email, setEmail,
      avatar, setAvatar,
      showLogin, setShowLogin,
      emailUserPage, setEmailUserPage
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            localStorage.getItem("token") ? <Moller /> : <Logar/>} />
        </Routes>
      </BrowserRouter>
    </AppCtx.Provider>
  );
}

export default App;
