import { Router } from "express";
import { registerUser, loginUser, setAvatar, getAllContact } from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/setavatar/:id', setAvatar);
userRoutes.get('/getcontact/:id', getAllContact)

export default userRoutes;