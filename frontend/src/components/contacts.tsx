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
}

const Contacts: React.FC<contactProps> = () => {
  return <div>Contacts</div>;
};

export default Contacts;
