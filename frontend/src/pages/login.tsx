const Login = () => {
  return (
    <div className="bg-[#f9fafb] flex gap-8 flex-col justify-center items-center min-h-screen min-w-screen">
      <div className="text-3xl font-semibold">Welcome to ChatterBox!</div>
      <div className="p-8 bg-slate-100 shadow-md rounded-md flex flex-col items-center">
        <form action="" method="post" className="w-96 flex flex-col gap-4">
          <label htmlFor="username" className="font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
          />

          <label htmlFor="password" className="font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
          />

          <button
            type="submit"
            className="w-full mt-4 bg-[#4f46e5] text-white font-medium rounded-md outline-2 py-1.5 hover:bg-indigo-500"
          >
            Login
          </button>

          <div className="flex gap-2 justify-end">
            <span className=" text-gray-700">Didn't sign up?</span>
            <a
              href="/register"
              className=" text-violet-700 font-semibold cursor-pointer"
            >
              Register
            </a>
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
    </div>
  );
};

export default Login;
