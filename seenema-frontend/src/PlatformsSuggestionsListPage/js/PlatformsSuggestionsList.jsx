// import api from '../../Homepage/js/api';
// import React, { useEffect, useState } from "react";
// import { fetchAllMovieProviders } from '../../api/tmdb';

// export const fetchAllMovieProviders = async (region = 'US') => {
//     try {
//         const response = await api.get(`/watch/providers/movie?watch_region=${region}`);
//         return response.data.results;
//     } catch (error) {
//         console.error('Error fetching all streaming platforms:', error);
//         return [];
//     }
// };const PlatformsSuggestionsList = () => {
//     const [providers, setProviders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const getProviders = async () => {
//             setLoading(true);
//             const providersList = await fetchAllMovieProviders('US');
//             setProviders(providersList);
//             setLoading(false);
//         };
//         getProviders();
//     }, []);

//     return (
//         <div className="platforms-suggestions-list">
//             <h3>Available Streaming Platforms</h3>
//             <ul>
//                 {loading ? (
//                     <li>Loading platform list...</li>
//                 ) : providers.length > 0 ? (
//                     providers.map((provider) => (
//                         <li key={provider.provider_id}>
//                             <img
//                                 src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
//                                 alt={provider.provider_name}
//                                 style={{ verticalAlign: "middle", marginRight: 8 }}
//                             />
//                             {provider.provider_name}
//                         </li>
//                     ))
//                 ) : (
//                     <li>No platforms found.</li>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default PlatformsSuggestionsList;