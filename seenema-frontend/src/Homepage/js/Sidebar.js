import React, {useEffect, useState} from "react";
import '../css/Sidebar.css';
import {Card,} from "@material-tailwind/react";
import api from "./api";
import {useNavigate} from 'react-router-dom';

const SidebarWithContentSeparator = ({selectedGenre}) => {
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    const handleGenreClick = (genreId) => {
        navigate(`/genre/${genreId}`);
    };

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await api.get('/genre/movie/list', {
                    params: {
                        language: 'en-US' // Change language code if necessary
                    }
                });

                const genresData = response.data.genres;

                // List of genre IDs or names to exclude
                const excludedGenres = [36, 10770, 37, 10402];

                // Filter genres to exclude the ones in the excludedGenres array
                const filteredGenres = genresData.filter(genre => !excludedGenres.includes(genre.id));

                setGenres(filteredGenres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    return (
        <Card
            className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 sidebar-homepage">
            <div className="genre-main">
                <h3 className="genre-heading">Genre</h3>
                {/* Render your sidebar with genres here */}
                <div className="genre-list">
                    {genres.map(genre => (
                        <li key={genre.id}>
                            <span onClick={() => handleGenreClick(genre.id)}
                                  className={`clickable-genre ${selectedGenre === genre.id ? 'selected-genre' : ''}`}>
                                {genre.name}
                            </span>
                        </li>
                    ))}
                </div>
            </div>
        </Card>

    );
}

export default SidebarWithContentSeparator;