import express from "express";
import { Login, Logout, Register } from "../controller/Auth.js";

const AuthRoutes = express.Router()

AuthRoutes.post('/register',Register)
AuthRoutes.post("/login",Login)
AuthRoutes.post("/logout",Logout)






export default AuthRoutes