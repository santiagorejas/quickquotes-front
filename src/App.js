import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Logo from "./components/UI/Logo/Logo";
import LoginPage from "./pages/Login/LoginPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import QuoteDetails from "./pages/Quote Details/QuoteDetails";

function App() {
  return (
    <div className="App">
      <Logo />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/quote/:qid" element={<QuoteDetails />} />
      </Routes>
    </div>
  );
}

export default App;
