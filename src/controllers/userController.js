import User from "../models/User.js";
import bcrypt from "bcryptjs";

// --- REGISTRO (Ya lo tienes, está perfecto) ---
export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: "El usuario ya existe"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({message: "Error en el servidor"});
    }
};

// --- LOGIN (Añade esto debajo) ---
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // 1. Buscar si el usuario existe por email
        const user = await User.findOne({email});

        if (user && (await bcrypt.compare(password, user.password))) {
            // Si el usuario existe y la contraseña coincide
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                message: "Inicio de sesión exitoso",
            });
        } else {
            // Si algo falla, enviamos 401 (No autorizado)
            res.status(401).json({message: "Correo o contraseña incorrectos"});
        }
    } catch (error) {
        res.status(500).json({message: "Error al intentar iniciar sesión"});
    }
};
