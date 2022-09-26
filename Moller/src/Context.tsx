import { createContext, Dispatch, SetStateAction } from "react";

interface AppContextInterface {
    nome: string;
    setNome?: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail?: Dispatch<SetStateAction<string>>;
    avatar: string;
    setAvatar?: Dispatch<SetStateAction<string>>;
  }

  const defaultState = {
    nome: "",
    email: "",
    avatar: ""
  };

  const AppCtx = createContext<AppContextInterface>(defaultState);

  export default AppCtx