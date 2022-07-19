import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Logo from "./components/UI/Logo/Logo";
import LoginPage from "./pages/Login/LoginPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <Logo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
