import {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { GetMeResponse, User } from "../../type/type";
import { getMe } from "./api/auth.api";
// import  { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setloading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data: GetMeResponse = await getMe();
        setUser(data.user);
      } catch (error) {
        if (error instanceof Error) console.log(error.message)
      }finally{
        setloading(false)

      }
    };
    getAndSetUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setloading }}>
      {children}
    </AuthContext.Provider>
  );
};
