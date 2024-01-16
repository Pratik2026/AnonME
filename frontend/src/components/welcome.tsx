import robot from "../assets/robot.gif";

interface User {
  _id: number;
  username: string;
  email: string;
  password: string;
  avatarImage: string;
  isAvatarImageSet: boolean;
}


const Welcome = ({ currentusername }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 ">
      <img src={robot} alt="" className="h-60" />
      <div className="text-3xl text-white font-bold">
        Welcome,{" "}
        <span className=" text-[#4e0eff]">{currentusername}!</span>
      </div>
      <div className="text-lg text-white mb-20">Please select a chat to Start messaging.</div>
    </div>
  );
};

export default Welcome;
