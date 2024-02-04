"use client";
import { useState, useRef } from "react";
import { Button, Popover } from "keep-react";
import EmojiPicker from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import { Paperclip, Smiley, PaperPlaneRight, Image, File, Camera, MapPin } from "phosphor-react";

const Chatinput = ({ handleMsgSend }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const uploadArearef = useRef<HTMLInputElement>(null);
  const attachmentRef = useRef<HTMLButtonElement>(null);

  const [msg, setmsg] = useState<string>("");

  const sendChat = () => {
    if (msg === "") return;
    handleMsgSend(msg);
    setmsg("");
  };

  const handleTextareaChange = () => {
    if (!textAreaRef.current) return;
    const textAreaRows = textAreaRef.current.value.split("\n").length;
    textAreaRef.current.rows = textAreaRows > 2 ? 2 : textAreaRows;
  };

  const handleEmojiClick = (emojiObj: { emoji: string }) => {
    const finalMsg = msg + emojiObj.emoji;
    setmsg(finalMsg);
  };

  const hanldeMediaClick = (MediaType:string) => {
    if (uploadArearef.current) {
      uploadArearef.current.accept = MediaType;
      uploadArearef.current.click();
    }
  };

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader(); // This allow us to read the file content as base64 string

      reader.readAsDataURL(file); // Start reading the file as a base64 string

      // The loadend event is fired when a file read has completed, successfully or not.
      reader.onloadend = () => { 
        const base64String = reader.result as string;
        handleMsgSend(base64String, "file");
      };
    }
  }

  return (
    <div className="flex w-full h-full justify-center items-center gap-4">
      <Popover trigger="click">
        <Popover.Title>
          {" "}
          <EmojiPicker
            height={320}
            previewConfig={{ showPreview: false }}
            emojiStyle={EmojiStyle.GOOGLE}
            onEmojiClick={handleEmojiClick}
            skinTonesDisabled
          />
        </Popover.Title>
        <Popover.Action>
          <Button size="xs" type="text" className="hover:bg-[#333333]">
            <Smiley size={24} className="text-white" />
          </Button>
        </Popover.Action>
      </Popover>

      {/*File uploads popover */}
      <Popover trigger="click" className="bg-gray-100">
        <Popover.Title className="bg-gray-50">
          {" "}
          <div className="w-48 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg">
            <button
              type="button"
              id="image/*" // Type of file to accept
              onClick={(e) => hanldeMediaClick(e.currentTarget.id)}
              className="relative inline-flex gap-4 items-center w-full px-4 py-2 text-sm font-medium bg-gray-50  border-b border-gray-200 rounded-t-lg hover:bg-gray-100"
            >
              <Image size={24} />
              Photos & Videos
            </button>
            <input type="file" className="hidden" ref={uploadArearef} onChange={selectFile} accept="image/*" />
            <button
              type="button"
              id="application/*"
              onClick={(e) => hanldeMediaClick(e.currentTarget.id)}
              className="relative inline-flex gap-4 items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
            >
              <File size={24} />
              Documents
            </button>
            <button
              type="button"
              className="relative inline-flex gap-4 items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
            >
              <Camera size={24} />
              Camera
            </button>
            <button
              type="button"
              className="relative inline-flex gap-4 items-center w-full px-4 py-2 text-sm font-medium rounded-b-lg bg-gray-50 hover:bg-gray-100"
            >
              <MapPin size={24} />
              Location
            </button>
          </div>
        </Popover.Title>
        <Popover.Action>
          <Button size="xs" type="text" className="hover:bg-[#333333]">
            <Paperclip size={24} className="text-white" />
          </Button>
        </Popover.Action>
      </Popover>

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
          ref={textAreaRef}
          rows={1}
          className="w-full py-2 px-4 rounded-xl focus:outline-none resize-none bg-[#333333] text-white"
        ></textarea>
      </div>
      <Button
        size="xs"
        type="text"
        onClick={() => sendChat()}
        className="hover:bg-[#333333]"
      >
        <PaperPlaneRight size={24} className="text-white" />
      </Button>
    </div>
  );
};

export default Chatinput;
