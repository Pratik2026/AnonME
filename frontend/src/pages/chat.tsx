import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllContactsRoute } from "../utils/api_routes";
import Contacts from "../components/contacts";

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
  const [contact, setContact] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState<User | undefined>(
    undefined
  );

  React.useEffect(() => {
    async function setUser() {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        const user = localStorage.getItem("user");
        console.log(user);
        if (user) {
          const parsedUser = await JSON.parse(user);
          console.log(parsedUser);
          
          setCurrentUser(parsedUser);
        }
      }
    }
    setUser();
  }, []);

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
  }, [currentUser, navigate]);

  return (
    <div className="container w-screen h-screen bg-slate-400 flex flex-col justify-center items-center grid-cols-2">
      <Contacts contacts={contact} />
    </div>
  );
};

export default Chat;
