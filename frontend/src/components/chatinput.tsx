import { useState, useRef } from "react";
import { Button } from "keep-react";

const Chatinput = ({ handleMsgSend }) => {
  const [msg, setmsg] = useState<string>("");

  const sendChat = () => {
    if (msg === "") return;
    handleMsgSend(msg);
    setmsg("");
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  console.log(textareaRef);

  const handleTextareaChange = () => {
    if (!textareaRef.current) return;

    const textAreaRows = textareaRef.current.value.split("\n").length;
    textareaRef.current.rows = textAreaRows > 2 ? 2 : textAreaRows;
  };

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="user-input flex gap-8 justify-center items-center h-full w-3/4 rounded-full ">
        <textarea
          placeholder="Type a message"
          name="message"
          id="message"
          value={msg}
          onChange={(e) => {
            setmsg(e.target.value);
            handleTextareaChange();
          }}
          ref={textareaRef}
          rows={1}
          className="w-full py-2 px-4 rounded-xl focus:outline-none resize-none bg-[#333333] text-white"
        ></textarea>
        <Button className="px-2" onClick={() => sendChat()} size="xs" type="primary">
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chatinput;
