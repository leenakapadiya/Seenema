import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Accept: "application/json"
    },
    params: {
        api_key: API_KEY,
    }
})




