import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Chat from "./pages/chat";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
