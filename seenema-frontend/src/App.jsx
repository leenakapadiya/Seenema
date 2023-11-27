import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import SignUp from "./Auth/JavaScript/SignUp"
import SignIn from "./Auth/JavaScript/SignIn"
import Homepage from "./Homepage/js/Homepage";
import SignOut from "./Auth/JavaScript/SignOut";
import ForgotPassword from "./Auth/JavaScript/ForgotPassword";
import ResetPassword from "./Auth/JavaScript/ResetPassword";
import DetailPage from './DetailPage/DetailPage';
import UserProfilePage from './ProfilePage/js/UserProfilePage';
import MyList from './MyListPage/js/MyList';
import {AuthProvider} from "./Auth/JavaScript/AuthContext"
import RouteGuard from "./Auth/JavaScript/RouteGuard";
import GenreMoviesPage from "./Homepage/js/GenreMoviesPage";
import SuggestedMoviesList from "./SuggestionsListPage/js/ListOfMovies";
import MovieSuggestionList from "./SuggestionsListPage/js/MovieSuggestionList";
import SearchedCardsPage from "./Homepage/js/SearchedCardsPage"; // Adjust the path as necessary


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
                    <Route path="/genre/:genreId" element={<GenreMoviesPage/>}/>
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
