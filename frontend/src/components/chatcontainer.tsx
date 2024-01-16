import Logout from "../components/logout";
import Chatinput from "./chatinput";

const Chatcontainer = ({ currentChat }) => {

  const handleMsgSend = (msg) => {
    console.log(msg);
  }
  return (
    <div>
      {currentChat && (
        <div className="chat-container w-[100%] h-[100%] flex flex-col justify-between">
          <div className="chat-header flex justify-between items-center bg-emerald-500">
            <div className="flex items-center gap-2">
              <img
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                alt=""
                className="w-16 h-16  m-2"
              />
              <div>{currentChat.username}</div>
            </div>
            <Logout />
          </div>
          <Chatinput handleMsgSend={handleMsgSend} />
        </div>
      )}
    </div>
  );
};

export default Chatcontainer;
