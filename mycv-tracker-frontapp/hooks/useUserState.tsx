import { useContext, createContext, useState, useCallback, ReactElement, useEffect } from "react";
import axios from "axios";

import { LoginResponse, UserObject } from "../types/auth_types";
import {
  getUserFromLocalStorage,
  getUserFromSessionStorage,
  storeUserInLocalStorage,
  storeUserInSessionStorage,
} from "../utils/storage-utils";

type ContextType = {
  user: UserObject | null;
  loginUser: (email: string, password: string, rememberme: boolean) => void;
  signupUser: () => void;
  logoutUser: () => void;
};

const UserContext = createContext<ContextType>({
  user: null,
  loginUser: () => {},
  signupUser: () => {},
  logoutUser: () => {},
});

export const useUserState = () => useContext(UserContext);

const temp: LoginResponse = {
  token:
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbmZvQG15Y3Z0cmFja2VyLmNvbSIsImF1ZCI6IndlYiIsImV4cCI6MTY2ODc1NjYzMSwiaWF0IjoxNjY4MTUxODMxfQ.ZC1EWq2MiT2CNGVJ2B-EILQ2KfjaRiQk9sDGkI4PZ5kK9WiuzVyHZbp40dsF8MrtSBKYXoPPkP2qQIEVeuQmGA",
  user: {
    id: 1206,
    email: "info@mycvtracker.com",
    firstName: "My CV",
    lastName: "Tracker",
    password: "$2a$10$EcciozsEiYtZoSvnks75jeCYQuc4tYHKBf4idTDjrVXeHR0qqMbPa",
    activationKey: "d9c51ebb6c084ce58a9e0dd4e6e0a99b",
    isActivated: true,
    cvMarketingUserAccount: "",
    cvMarketingUserPassword: "",
    roleId: 2,
    session: null,
    userAddress: "127.0.0.1",
    activationDate: "2018-04-13T11:52:17.000+00:00",
    signUpDate: "2018-04-13T11:51:59.000+00:00",
    userReminderCount: 3,
    trackingMode: 1,
    currentResumePreviewId: 2,
    disabled: false,
    userRole: "ADMIN",
    activated: true,
  },
};

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
        storeUserInLocalStorage(response.data.user, response.data.token);
        // Store in Local storage
      } else {
        storeUserInSessionStorage(response.data.user, response.data.token);
        // Store in session storage
      }
    }
  }, []);

  const signupUser = useCallback(() => {}, []);

  const logoutUser = useCallback(() => {
    setUser(null);
  }, []);

  return <UserContext.Provider value={{ user, loginUser, logoutUser, signupUser }}>{children}</UserContext.Provider>;
};
