import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignUp from "./Auth/JavaScript/SignUp"
import ConfirmSignUp from "./Auth/JavaScript/ConfirmSignUp"
import signIn from "./Auth/JavaScript/SignIn";
import SignIn from "./Auth/JavaScript/SignIn";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
