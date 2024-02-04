import mongoose from "mongoose";

const MsgSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: "text",
      },
    },
    User: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Msg = mongoose.model("Msg", MsgSchema);

export default Msg;
