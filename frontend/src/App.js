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


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element = {<Home />}/>
          <Route exact path="*" element = {<PageNotFound />}/>
          <Route exact path="/login" element = {<LogIn />}/>
          <Route exact path="/register" element = {<Register />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
