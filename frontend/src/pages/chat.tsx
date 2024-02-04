import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllContactsRoute, host } from "../utils/api_routes";
import Contacts from "../components/contacts";
import Welcome from "../components/welcome";
import ChatContainer from "../components/chatcontainer";
import { io } from "socket.io-client";

interface User {
  _id: number;
  username: string;
  email: string;
  password: string;
  avatarImage: string;
  isAvatarImageSet: boolean;
}

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contact, setContact] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState<User | undefined>(
    undefined
  );
  const [currentChat, setCurrentChat] = React.useState<User | undefined>(
    undefined
  );

  React.useEffect(() => {
    async function setUser() {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        const user = localStorage.getItem("user");
        if (user) {
          const parsedUser = await JSON.parse(user);
          setCurrentUser(parsedUser);
        }
      }
    }
    setUser();
  }, []);

  React.useEffect(() => {
    const socketCheck = async () => {
      if (currentUser) {
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
      }
    };
    socketCheck();
  }, [currentUser]);

  React.useEffect(() => {
    const fetchContact = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(
            `${getAllContactsRoute}/${currentUser._id}`
          );
          setContact(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchContact();
  }, [currentUser]);

  const handleChatChange = (contact: User) => {
    setCurrentChat(contact);
  };

  return (
    <div className="fullwindow w-screen h-screen bg-[#010101] flex flex-col justify-center items-center">
      <div className="container w-[95vw] h-[95vh] bg-[#010101] grid grid-cols-my2">
        <Contacts
          contacts={contact}
          currentuser={currentUser}
          chatChange={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome currentusername={currentUser?.username} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
