import React, { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";


interface User {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode
}


const AuthContenxt = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post("/sessions", {
      email,
      password
    });

    const { token, user } = response.data;
    api.defaults.headers.authorization = `Bearer ${token}`
    setData({ token, user });
  }

  return (
    <AuthContenxt.Provider
      value={{
        user: data.user,
        signIn
      }}
    >
      {children}
    </AuthContenxt.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContenxt);
  return context;
}

export { AuthProvider, useAuth }