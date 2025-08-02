import api from '../Homepage/js/api';

export const fetchAllMovieProviders = async (region = 'US') => {
    try {
        const response = await api.get(`/watch/providers/movie`, {
            params: { watch_region: region }
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching all streaming platforms:', error);
        return [];
    }
};