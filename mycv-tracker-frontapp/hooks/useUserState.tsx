import { useContext, createContext, useState, useCallback, ReactElement, useEffect } from "react";
import axios from "axios";

import { LoginResponse, UserObject } from "../types/auth_types";
import {
  clearLocalStorage,
  clearSessionStorage,
  getUserFromLocalStorage,
  getUserFromSessionStorage,
  storeUserInLocalStorage,
  storeUserInSessionStorage,
} from "../utils/storage-utils";

type ContextType = {
  user: UserObject | null;
  token: string;
  loginUser: (email: string, password: string, rememberme: boolean) => void;
  signupUser: () => void;
  logoutUser: () => void;
};

const UserContext = createContext<ContextType>({
  user: null,
  token: "",
  loginUser: () => {},
  signupUser: () => {},
  logoutUser: () => {},
});

export const useUserState = () => useContext(UserContext);

export const UserStateProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<null | UserObject>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    let response = getUserFromLocalStorage();
    if (response === null) response = getUserFromSessionStorage();
    console.log({ response });
    if (response === null) {
      setUser(null);
      setToken("");
    } else {
      setToken(response.token);
      setUser(response.user);
    }
  }, []);
  const loginUser = useCallback(async (email: string, password: string, rememberme: boolean) => {
    const response = await axios<LoginResponse>({
      method: "post",
      url: process.env.NEXT_PUBLIC_MYCVTRACKER_API_HOST + "/auth/login",
      data: {
        email,
        password,
        rememberme,
      },
    });

    if (response.status === 200) {
      setUser(response.data.user);
      setToken(response.data.token);
      if (rememberme) {
        // Store in Local storage
        storeUserInLocalStorage(response.data.user, response.data.token);
      } else {
        // Store in session storage
        storeUserInSessionStorage(response.data.user, response.data.token);
      }
    }
  }, []);

  const signupUser = useCallback(() => {}, []);

  const logoutUser = useCallback(() => {
    setUser(null);
    clearLocalStorage();
    clearSessionStorage();
  }, []);

  return (
    <UserContext.Provider value={{ user, token, loginUser, logoutUser, signupUser }}>{children}</UserContext.Provider>
  );
};
