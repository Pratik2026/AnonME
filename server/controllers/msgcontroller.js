import Msg from "../models/msgModel.js";

const addMsg = async (req, res, next) => {
  try {
    const { from, to, msg, msgtype } = req.body;
    const data = await Msg.create({
      message: {
        text: msg,
        type: msgtype,
      },
      User: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ message: "Message sent!", status: true });
    }

    return res.json({ message: "Message sent failed!".red(), status: false });
  } catch (error) {
    next(error);
  }
};

const getAllMsg = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Msg.find({
      User: { $all: [from, to] },
    }).sort({ updatedAt: 1 });

    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        type: msg.message.type,
      };
    });

    return res.json(projectMessages);
  } catch (error) {}
};

export { addMsg, getAllMsg };
