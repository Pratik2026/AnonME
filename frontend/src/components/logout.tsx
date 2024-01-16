import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {

    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <button
      onClick={() => handleLogout()}
      className="btn flex justify-center items-center h-1/2 p-4 bg-blue-900 rounded-md mr-2 text-white"
    >
      Logout
    </button>
  );
};

export default Logout;
