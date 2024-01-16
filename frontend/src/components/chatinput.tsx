import React from "react";

const Chatinput = ({ handleMsgSend }) => {
  const [msg, setmsg] = React.useState<string>("");

  const sendChat = (e) => {
    
    
    if (msg === "") return;
    handleMsgSend(msg);
    setmsg("");
  };
  return (
    <div className="flex justify-center">
      <div className="user-input flex justify-center items-center mb-4 h-10 w-3/4 rounded-full bg-gray-700">
        <input
          type="text"
          placeholder="type your message here"
          name="message"
          id="message"
          value={msg}
          onChange={(e) => setmsg(e.target.value)}
          className="w-full h-full p-2 rounded-l-full"
        />
        <button onClick={(e) => sendChat(e)} className="w-1/12 h-full text-white bg-blue-600 rounded-r-full">
          send
        </button>
      </div>
    </div>
  );
};

export default Chatinput;
