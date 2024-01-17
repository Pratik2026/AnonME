import React from "react";
import Logout from "../components/logout";
import Chatinput from "./chatinput";
import axios from "axios";
import { msgSendRoute } from "../utils/api_routes";
import { getAllMsgRoute } from "../utils/api_routes";

const Chatcontainer = ({ currentChat, currentUser, socket }) => {
  const scrollRef = React.useRef();
  const [messages, setMessages] = React.useState<string[]>([]);
  const [arrivalMsg, setArrivalMsg] = React.useState(null);

  React.useEffect(() => {
    async function fetchAllMsg() {
      const response = await axios.post(getAllMsgRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    fetchAllMsg();
  }, [currentChat]);

  const handleMsgSend = async (msg) => {
    await axios.post(msgSendRoute, {
      from: currentUser._id,
      to: currentChat._id,
      msg: msg,
    });
    socket.current.emit("send-msg", {
      from: currentUser._id,
      to: currentChat._id,
      msg: msg,
    });

    const msges = [...messages];
    msges.push({ message: msg, fromSelf: true });
    setMessages(msges);
  };

  React.useEffect(() => {
    socket.current.on("receive-msg", (msg) => {
      setArrivalMsg({ message: msg, fromSelf: false });
    });
  }, []);

  React.useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div>
      {currentChat && (
        <div className="chat-container w-[100%] h-[100%] flex flex-col justify-between">
          <div className="chat-header flex justify-between items-center bg-emerald-500">
            <div className="flex items-center gap-2">
              <img
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                alt=""
                className="w-16 h-16 m-2"
              />
              <div>{currentChat.username}</div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages h-full w-full px-4 py-8 flex flex-col justify-end gap-4 overflow-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message flex items-center rounded-2xl max-w-[40%] ${
                  msg.fromSelf
                    ? " text-white justify-end bg-blue-500 self-end text-right"
                    : " bg-green-500 justify-start self-start"
                }`}
              >
                <div className="content w-full break-words p-2 text-base">
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          <Chatinput handleMsgSend={handleMsgSend} />
        </div>
      )}
    </div>
  );
};

export default Chatcontainer;
