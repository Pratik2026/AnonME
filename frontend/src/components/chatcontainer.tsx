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
    <>
      {currentChat && (
        <div className="chat-container grid grid-rows-mycc3 overflow-hidden border border-[#222222]">
          <div className="chat-header flex justify-between items-center bg-[#111111] border border-[#222222]">
            <div className="flex items-center gap-2">
              <img
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                alt=""
                className="w-12 h-12 m-2"
              />
              <div className="text-white">{currentChat.username}</div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages px-6 py-8 flex flex-col gap-4 overflow-auto scroll-smooth">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message flex flex-col max-w-[400px] leading-1.5 border-gray-200 rounded-b-xl text-white bg-[#222222] min-w-[100px] ${
                  msg.fromSelf
                    ? " justify-end self-end text-left rounded-tl-xl"
                    : " justify-start self-start rounded-tr-xl"
                }`}
              >
                <div className="content w-full break-words p-2 text-base">
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chatinput bg-[#111111] flex justify-center items-end border border-[#222222] overflow-hidden">
            <Chatinput handleMsgSend={handleMsgSend} />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatcontainer;
