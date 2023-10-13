import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;

        const namecheck = await User.findOne({ username });
        if (namecheck) {
            return res.json({ message: "Username already exists!", status: false });
        }

        const emailcheck = await User.findOne({ email });
        if (emailcheck) {
            return res.json({ message: "Email already exists!", status: false });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedpassword,
            email,
        });

        delete user.password;
        return res.status(201).json({ status: true, message: "User created successfully!", user });
    } catch (error) {
        next(error);
    }

}

export default registerUser;