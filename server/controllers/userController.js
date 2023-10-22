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
    return res
      .status(201)
      .json({ status: true, message: "User created successfully!", user });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (!usernameCheck) {
      return res.json({ message: "Username does not exist!", status: false });
    }
    const passwordCheck = await bcrypt.compare(
      password,
      usernameCheck.password
    );
    if (!passwordCheck) {
      return res.json({ message: "Password is incorrect!", status: false });
    }
    delete usernameCheck.password;
    return res.json({
      status: true,
      message: "Login Successfully!",
      user: usernameCheck,
    });
  } catch (error) {
    next(error);
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImg = req.body.img;

    const userData = await User.findByIdAndUpdate(userId, {
      avatarImage: avatarImg,
      isAvatarImageSet: true,
    });

    return res.json({
      isSet: userData.isAvatarImageSet,
      img: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, setAvatar };
