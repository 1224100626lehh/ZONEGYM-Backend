import express from "express";
// Importamos también loginUser (que crearemos en el controlador)
import {registerUser, loginUser} from "../controllers/userController.js";

const router = express.Router();

// Ruta para registrar: POST http://localhost:5000/api/users/register
router.post("/register", registerUser);

// Ruta para login: POST http://localhost:5000/api/users/login
router.post("/login", loginUser);

export default router;
