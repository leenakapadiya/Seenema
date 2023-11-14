import axios from 'axios';

// Retrieve API key from the env variable
const API_KEY = process.env.REACT_APP_API_KEY;

export default axios.create({
    // Set baseURL, all request will append to this baseURL
    baseURL: 'https://api.themoviedb.org/3',

    // Set headers for all the requests
    headers: {
        Accept: "application/json"
    },

    // Set default param for all the requests
    // 'api_key' parameter is added to authenticate the requests using TMDB API key
    params: {
        api_key: API_KEY,
    }
})




