import React from "react";
import axios from "axios";
import { ToastOptions, Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerRoute } from "../utils/api_routes";

const Register = () => {
  const navigate = useNavigate();
  const [formval, setFormval] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions: ToastOptions = {
    position: "top-center",
    duration: 3000,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormval({ ...formval, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleValidation()) {
      const { username, password, email } = formval;

      const { data } = await axios.post(registerRoute, {
        username,
        password,
        email,
      });

      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }

      if (data.status === true) {
        toast.success(data.message, toastOptions);
        setTimeout(() => navigate("/login"), 3000);
      }
    }
  };

  const handleValidation = (): boolean => {
    const { username, password, confirmPassword, email } = formval;

    if (password !== confirmPassword) {
      toast.error("Confirm Password do not match!", toastOptions);
      return false;
    }
    if (
      username === "" ||
      password === "" ||
      confirmPassword === "" ||
      email === ""
    ) {
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
      <div className="text-3xl font-semibold">Register Your Account</div>
      <div className="p-8 bg-slate-100 shadow-md rounded-md flex flex-col items-center">
        <form
          action=""
          method="post"
          className="w-96 flex flex-col gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="username" className="font-medium">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
            onChange={(e) => handleChange(e)}
          />

          <label htmlFor="email" className="font-medium">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
            onChange={(e) => handleChange(e)}
          />

          <label htmlFor="confirmPassword" className="font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
            onChange={(e) => handleChange(e)}
          />

          <button
            type="submit"
            className="w-full mt-4 bg-[#4f46e5] text-white font-medium rounded-md outline-2 py-1.5 hover:bg-indigo-500"
          >
            Register
          </button>

          <div className="flex gap-4 justify-center">
            <span className=" text-gray-700">Already have an account?</span>
            <a
              href="/login"
              className=" text-violet-700 font-semibold cursor-pointer"
            >
              Login
            </a>
          </div>
        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Register;
