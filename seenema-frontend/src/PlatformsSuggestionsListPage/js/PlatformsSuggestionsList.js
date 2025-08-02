import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlatformsSuggestionsList = () => {
    const navigate = useNavigate();

    // Function to navigate back
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="platforms-suggestions-list">
            <button onClick={handleGoBack} className="generic-button button-back-suggestionList">
                Back
            </button>
        </div>
    );
};

export default PlatformsSuggestionsList;