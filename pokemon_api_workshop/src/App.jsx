import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
import Profile from "./component/Profile";
import Pokemon from "./component/Pokemon";
import Admin_table from "./component/Admin_table";
import Navbar from "./component/Navbar";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/Admin" element={<Admin_table />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
