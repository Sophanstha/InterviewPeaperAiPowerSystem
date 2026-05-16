import axios from "axios";
import type {
  LoginResponse,
  RegisterResponse,
  GetMeResponse,
} from "../../../type/type.ts";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const Register = async (
  email: string,
  password: string,
  username: string,
): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("/auth/userRegister", {
    email,
    password,
    username,
  });
  return res.data;
};

export const Login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return res.data;
};

export const Logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const getMe = async (): Promise<GetMeResponse> => {
  const res = await api.get<GetMeResponse>("/auth/getme");
  return res.data;
};