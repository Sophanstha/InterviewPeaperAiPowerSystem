import { Router } from "express";
import {
  getMe,
  loginUser,
  logout,
  registerUser,
} from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.middleware.js";

const authRoute = Router();
authRoute.route("/userRegister").post(registerUser);
authRoute.route("/login").post(loginUser);
authRoute.route("/logout").get(logout);
authRoute.route("/getme").get(authMiddleware, getMe);
export default authRoute;
