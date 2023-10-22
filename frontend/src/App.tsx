import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Chat from "./pages/chat";
import Login from "./pages/login";
import Register from "./pages/register";
import SetAvatar from './pages/setAvatar';

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setavatar" element={<SetAvatar />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
