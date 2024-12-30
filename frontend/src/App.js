import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home/Home.js';
import PageNotFound from './components/PageNotFound/PageNotFound.js';
import LogIn from './components/LogIn/LogIn.js';
import Register from './components/Register/Register.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Profile from './components/Profile/Profile.js';


function App() {
  return (
    <div className="App" style={{ textAlign: "center", justifyContent: "center", color: "white" }}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="*" element={<PageNotFound />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
