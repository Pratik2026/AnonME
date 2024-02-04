import React from "react";

interface User {
  _id: number;
  username: string;
  email: string;
  password: string;
  avatarImage: string;
  isAvatarImageSet: boolean;
}

interface contactProps {
  contacts: User[];
  currentuser: User | undefined;
  chatChange: (contact: User) => void;
}

const Contacts: React.FC<contactProps> = ({
  currentuser,
  contacts,
  chatChange,
}) => {
  const [currentUserName, setCurrentUserName] = React.useState<string>("");
  const [currentUserImage, setCurrentUserImage] = React.useState<string>("");
  const [selected, setSelected] = React.useState<number>(-1);

  React.useEffect(() => {
    async function setinitials() {
      const user = localStorage.getItem("user");
      if (user) {
        const data = await JSON.parse(user);
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
      }
    }
    setinitials();
  }, []);

  const handleSelectedChat = (index: number, contact: User) => {
    setSelected(index);
    chatChange(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="bg-[#111111] grid grid-rows-my3 border border-[#222222] overflow-hidden">
          <div className="flex justify-center items-center gap-4">
            <h2 className="text-white">ChatterBox</h2>
            <img src="./google.svg" alt="" className="" />
          </div>

          <div className="contactsContainer flex flex-col gap-2 overflow-auto">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleSelectedChat(index, contact)}
                  className={`${
                    index === selected ? "bg-[#333333]" : ""
                  } bg-[#111111] w-full min-h-[5rem] flex justify-start items-center gap-4 hover:bg-[#222222]`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=""
                    className="w-12 h-12  m-2"
                  />
                  <div className="text-white">{contact.username}</div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center items-center gap-4">
            <img
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt=""
              className="w-12 h-12  m-2"
            />
            <h2 className="text-white">{currentUserName}</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
