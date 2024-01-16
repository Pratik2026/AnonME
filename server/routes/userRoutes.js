import { Router } from "express";
import { registerUser, loginUser, setAvatar, getAllContact } from "../controllers/userController.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/setavatar/:id', setAvatar);
router.get('/getcontact/:id', getAllContact)

export default router;