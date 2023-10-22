import React from "react";
import { ToastOptions, Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/api_routes";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    username: "",
    password: "",
  });

  const toastOptions: ToastOptions = {
    position: "top-center",
    duration: 3000,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password } = values;

    if (handleValidation()) {
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === true) {
        toast.success(data.message, toastOptions);
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => navigate("/"), 3000);
      }
      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }
    }
  };

  const handleValidation = (): boolean => {
    const { username, password } = values;

    if (username === "" || password === "") {
      toast.error("Please fill out all fields!", toastOptions);
      return false;
    }
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long!", toastOptions);
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <div className="bg-[#f9fafb] flex gap-8 flex-col justify-center items-center min-h-screen min-w-screen">
      <div className="text-3xl font-semibold">Welcome to ChatterBox!</div>
      <div className="p-8 bg-slate-100 shadow-md rounded-md flex flex-col items-center">
        <form
          method="post"
          className="w-96 flex flex-col gap-4"
          onSubmit={(e) => handleSubmit(e) }
        >
          <label htmlFor="username" className="font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
            onChange={(e) => handleChange(e)}
          />

          <label htmlFor="password" className="font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
            onChange={(e) => handleChange(e)}
          />

          <button
            type="submit"
            className="w-full mt-4 bg-[#4f46e5] text-white font-medium text-lg  rounded-md outline-2 py-1.5 hover:bg-indigo-500"
          >
            Login
          </button>

          <div className="flex gap-2 justify-between">
          <div className="text-violet-700 font-semibold cursor-pointer">Forgot Password?</div>
            <div>
            <span className=" text-gray-700 mr-2">Didn't sign up?</span>
            <a
              href="/register"
              className=" text-violet-700 font-semibold cursor-pointer"
            >
              Register
            </a>
            </div>
           
          </div>
          <div className="flex justify-center items-center gap-4">
            <hr className=" w-28 "></hr>
            <span className="text-gray-700 font-medium mb-1.5">
              continue with
            </span>
            <hr className=" w-28"></hr>
          </div>

          <div>
            <button
              type="submit"
              className="w-full mt-4 bg-gray-800 text-white font-medium rounded-md outline-2 py-1.5 hover:bg-gray-700 flex justify-center items-center gap-2"
            >
              <img src="./google.svg" alt="google-icon" className="w-6" />
              <span>Login With Google</span>
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Login;
