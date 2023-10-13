import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    }
},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;