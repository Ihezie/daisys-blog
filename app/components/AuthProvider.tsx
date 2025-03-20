"use client"

import { ReactNode, createContext, useContext } from "react";
import { Session } from "next-auth";

interface ContextType {
  session: Session | null;
}

const AuthContext = createContext<ContextType>({ session: null });

const AuthProvider = ({
  value,
  children,
}: {
  value: ContextType;
  children: ReactNode;
}) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
