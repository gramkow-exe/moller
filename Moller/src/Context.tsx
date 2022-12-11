import { createContext, Dispatch, SetStateAction } from "react";

interface AppContextInterface {
    aba: string;
    setAba?: Dispatch<SetStateAction<string>>;
    id: number;
    setId?: Dispatch<SetStateAction<number>>;
    nome: string;
    setNome?: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail?: Dispatch<SetStateAction<string>>;
    avatar: string;
    setAvatar?: Dispatch<SetStateAction<string>>;
    showLogin: Boolean,
    setShowLogin?: Dispatch<SetStateAction<boolean>>;
    emailUserPage: string,
    setEmailUserPage?: Dispatch<SetStateAction<string>>;
  }

  const defaultState = {
    aba: "home",
    id:0,
    nome: "",
    email: "",
    avatar: "",
    showLogin: true,
    showRegister: false,
    emailUserPage: ""
  };

  const AppCtx = createContext<AppContextInterface>(defaultState);

  export default AppCtx