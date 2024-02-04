import Logout from "../components/logout";
import Chatinput from "./chatinput";
import axios from "axios";
import { msgSendRoute } from "../utils/api_routes";
import { getAllMsgRoute } from "../utils/api_routes";
import { useState, useEffect, useRef } from "react";
import { Eye } from "phosphor-react";
import { Modal } from "keep-react";

const Chatcontainer = ({ currentChat, currentUser, socket }) => {
  const scrollRef = useRef();
  const [messages, setMessages] = useState<object[]>([]);
  const [arrivalMsg, setArrivalMsg] = useState<object>({});
  const [showImgModal, setShowImgModal] = useState(false);
  const [ImgInModal, SetImgInModal] = useState<string>("");

  useEffect(() => {
    async function fetchAllMsg() {
      const response = await axios.post(getAllMsgRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    fetchAllMsg();
  }, [currentChat]);

  useEffect(() => {
    socket.current.on("receive-msg", (msg:string) => {
      setArrivalMsg({ message: msg, fromSelf: false });
    });
  }, []);

  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    if (scrollRef.current) {
      (scrollRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleMsgSend = async (msg, msgtype?: string) => {
    await axios.post(msgSendRoute, {
      from: currentUser._id,
      to: currentChat._id,
      msg: msg,
      msgtype: msgtype,
    });
    socket.current.emit("send-msg", {
      from: currentUser._id,
      to: currentChat._id,
      msg: msg,
      msgtype: msgtype,
    });

    const msges = [...messages];
    msges.push({ message: msg, type: msgtype, fromSelf: true });
    setMessages(msges);
  };

  const handleImgINModal = (e: React.MouseEvent<HTMLImageElement>) => {
    SetImgInModal(e.currentTarget.src);
    setShowImgModal(!showImgModal);
  };

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
                ref={scrollRef}
                key={index}
                className={`chat-message flex flex-col max-w-[400px] leading-1.5 border-gray-200 rounded-b-xl text-white bg-[#222222] min-w-[100px] ${
                  msg.fromSelf
                    ? " justify-end self-end text-left rounded-tl-xl"
                    : " justify-start self-start rounded-tr-xl"
                }`}
              >
                <div className="content w-full break-words p-2 text-base">
                  {msg.type === "file" ? (
                    <>
                      <img
                        key={index}
                        src={`${msg.message}`}
                        alt=""
                        onClick={(e) => handleImgINModal(e)}
                      />
                      <Modal
                        icon={<Eye size={24} />}
                        size="6xl"
                        show={showImgModal}
                        position="top-center"
                        onClose={() => setShowImgModal(!showImgModal)}
                      >
                        <Modal.Header></Modal.Header>
                        <Modal.Body>
                          <img src={ImgInModal} alt="" />
                        </Modal.Body>
                      </Modal>
                    </>
                  ) : (
                    <p>{msg.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="chatinput bg-[#111111] flex justify-center items-end border border-[#222222]">
            <Chatinput handleMsgSend={handleMsgSend} />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatcontainer;
