import { Router } from "express";
import { registerUser, loginUser, setAvatar, getAllContact } from "../controllers/userController.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/setAvatar/:id', setAvatar);
router.post('/getcontact/:id', getAllContact)

export default router;