import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import SignUp from "./Auth/js/SignUp"
import SignIn from "./Auth/js/SignIn"
import Homepage from "./Homepage/js/Homepage";
import SignOut from "./Auth/js/SignOut";
import ForgotPassword from "./Auth/js/ForgotPassword";
import ResetPassword from "./Auth/js/ResetPassword";
import DetailPage from './DetailPage/js/DetailPage';
import UserProfilePage from './ProfilePage/js/UserProfilePage';
import MyList from './MyListPage/js/MyList';
import {AuthProvider} from "./Auth/js/AuthContext"
import RouteGuard from "./Auth/js/RouteGuard";
import GenreMoviesPage from "./Homepage/js/GenreMoviesPage";
import MovieSuggestionList from "./SuggestionsListPage/js/MovieSuggestionList";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/signIn" element={<SignIn/>}/>
                    <Route path="/Homepage" element={<Homepage/>}/>
                    <Route path="/signUp" element={<SignUp/>}/>
                    <Route path="/signOut" element={<SignOut/>}/>
                    <Route path="/forgotPassword" element={<ForgotPassword/>}/>
                    <Route path="/resetPassword" element={<ResetPassword/>}/>
                    <Route path="/movie/:movieId" element={<DetailPage/>}/>
                    <Route path="/genre/:genreId/:searchTerm" element={<GenreMoviesPage/>}/>
                    <Route path="/genre/:genreId" element={<GenreMoviesPage/>}/>
                    <Route path="/search/:searchTerm" element={<Homepage/>} />
                    <Route path="*" element={<Navigate to="/Homepage"/>}/>
                    <Route
                        path="/profile"
                        element={
                            <RouteGuard>
                                <UserProfilePage/>
                            </RouteGuard>
                        }
                    />
                    <Route
                        path="/myList"
                        element={
                            <RouteGuard>
                                <MyList/>
                            </RouteGuard>
                        }
                    />
                    <Route
                        path="/suggestionsList"
                        element={
                            <RouteGuard>
                                <MovieSuggestionList/>
                            </RouteGuard>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;