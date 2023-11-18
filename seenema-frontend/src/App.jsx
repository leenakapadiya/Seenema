import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import SignUp from "./Auth/JavaScript/SignUp"
import SignIn from "./Auth/JavaScript/SignIn"
import Homepage from "./Homepage/js/Homepage";
import SignOut from "./Auth/JavaScript/SignOut";
import ForgotPassword from "./Auth/JavaScript/ForgotPassword";
import ResetPassword from "./Auth/JavaScript/ResetPassword";
import DetailPage from './DetailPage/DetailPage';
import GenreMoviesPage from "./Homepage/js/GenreMoviesPage"; // Adjust the path as necessary


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/signIn" element={<SignIn/>}/>
                    <Route path="/Homepage" element={<Homepage/>}/>
                    <Route path="/signUp" element={<SignUp/>}/>
                    <Route path="/signOut" element={<SignOut/>}/>
                    <Route path="/forgotPassword" element={<ForgotPassword/>}/>
                    <Route path="/resetPassword" element={<ResetPassword/>}/>
                    <Route path="/movie/:movieId" element={<DetailPage/>}/> {/* Add this line */}
                    <Route path="/genre/:genreId" element={<GenreMoviesPage/>}/>
                    <Route path="*" element={<Navigate to="/Homepage"/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
