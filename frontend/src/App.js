import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.js";
import PageNotFound from "./components/PageNotFound/PageNotFound.js";
import LogIn from "./components/LogIn/LogIn.js";
import Register from "./components/Register/Register.js";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Profile from "./components/Profile/Profile.js";
import { createContext, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.js";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div
      className="App"
      style={{ textAlign: "center", justifyContent: "center", color: "white" }}
    >
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/register" element={<Register />} />
            <Route
              exact
              path="/profile"
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
