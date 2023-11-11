import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import SignUp from "./Auth/JavaScript/SignUp"
import SignIn from "./Auth/JavaScript/SignIn"
import Homepage from "./Homepage/js/Homepage";
import SignOut from "./Auth/JavaScript/SignOut";
import ForgotPassword from "./Auth/JavaScript/ForgotPassword";
import ResetPassword from "./Auth/JavaScript/ResetPassword";

function App() {
  return (
      <>
          <Router>
              <Routes>
                  <Route path="/signIn" element={<SignIn />} />
                  <Route path="/Homepage" element={<Homepage />} />
                  <Route path="/signUp" element={<SignUp />} />
                  <Route path="/signOut" element={<SignOut />} />
                  <Route path="/forgotPassword" element={<ForgotPassword />} />
                  <Route path="/resetPassword" element={<ResetPassword />} />
                  <Route path="*" element={<Navigate to="/Homepage" />} />
              </Routes>
          </Router>
      </>
  );
}

export default App;
