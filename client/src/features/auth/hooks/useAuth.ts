import { useContext } from "react";
import type { LoginResponse, RegisterResponse } from "../../../type/type";
import { AuthContext } from "../authContext";
import { Login, Logout, Register } from "../api/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, loading, setloading } = context;

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setloading(true);
    try {
      const response: LoginResponse = await Login(email, password);
      if (!response) throw new Error("No response from server");
      setUser(response.user);
    } catch (error) {
      if (error instanceof Error) {
        throw error.message;
      }
      throw new Error("Login failed");
    } finally {
      setloading(false);
    }
  };

  const handleRegister = async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    setloading(true);
    try {
      const response: RegisterResponse = await Register(
        email,
        password,
        username,
      );
      if (!response) throw new Error("No response from server");
      setUser(response.user);
    } catch (error) {
      if (error instanceof Error) {
        throw error.message;
      }

      throw new Error("failed to register");
    } finally {
      setloading(false);
    }
  };

  const handleLogout = async () => {
    setloading(true);
    await Logout();
    setUser(null);
    setloading(false);
  };

  return { user, loading, handleLogin, handleLogout, handleRegister };
};
