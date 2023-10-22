import axios from "axios";
import { Buffer } from "buffer";
import React from "react";
import toast, { ToastOptions, Toaster } from "react-hot-toast";
import loader from "../assets/loader.gif";
import { avatarRoute } from "../utils/api_routes";
import { useNavigate } from "react-router-dom";

const SetAvatar = () => {
  const avatar_api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();

  const [avatars, setAvatars] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = React.useState<number>(-1);

  const toastOptions: ToastOptions = {
    position: "top-center",
    duration: 3000,
  };

  React.useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === -1) {
      toast.error("Please select an avatar first!", toastOptions);
    } else {
      const user = localStorage.getItem("user");
      if (user !== null) {
        const parsedUser = await JSON.parse(user);
        const { data } = await axios.post(`${avatarRoute}/${parsedUser._id}`, {
          img: avatars[selectedAvatar],
        });

        if (data.isSet) {
          parsedUser.isAvatarImageSet = true;
          parsedUser.avatarImage = data.img;
          localStorage.setItem("user", JSON.stringify(parsedUser));
          navigate("/chat");
        } else {
          toast.error("Something went wrong!", toastOptions);
        }
      }
    }
  };

  React.useEffect(() => {
    async function getAvatars() {
      setIsLoading(true);
      const imgdata = [];

      for (let i = 0; i < 4; i++) {
        const img = await axios.get(
          `${avatar_api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(img.data);
        imgdata.push(buffer.toString("base64"));
      }

      setAvatars(imgdata);
      setIsLoading(false);
    }
    getAvatars();
  }, []);

  return isLoading ? (
    <div className="min-h-screen bg-[#1c1c1c] flex justify-center items-center">
      <img className="rounded-full" src={loader} alt="loader" />
    </div>
  ) : (
    <div className="bg-[#1c1c1c] min-h-screen flex justify-center">
      <div className="flex flex-col justify-start items-center gap-4">
        <div className=" text-5xl text-white p-28">
          <h1>Choose your avatar</h1>
        </div>
        <div className="flex justify-center items-center gap-10">
          {avatars.map((avatar, index) => {
            return (
              <div className="h-32 w-32 " key={index}>
                <img
                  className={`transition-all duration-500 ease-in-out ${
                    selectedAvatar === index
                      ? "border-8 border-[#4e0eff] rounded-full"
                      : "border-transparent"
                  }`}
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            );
          })}
        </div>

        <button
          className="min-w-full mt-20 bg-[#4e0eff] text-white text-2xl font-medium rounded-md outline-2 py-1.5 hover:bg-indigo-600"
          onClick={setProfilePicture}
        >
          Set as Profile Picture
        </button>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};
export default SetAvatar;
