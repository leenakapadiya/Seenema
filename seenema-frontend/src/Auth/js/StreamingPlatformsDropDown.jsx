import React, { useEffect, useState } from "react";
import Select from "react-select";
import { fetchAllMovieProviders } from '../../TMDB/tmdb';

const StreamingPlatformsDropdown = ({ value, onChange }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProviders = async () => {
            const providersList = await fetchAllMovieProviders('US');
            const formatted = providersList.map(provider => ({
                value: provider.provider_id,
                label: provider.provider_name,
                logo: provider.logo_path
            }));
            setOptions(formatted);
            setLoading(false);
        };
        getProviders();
    }, []);

    // Custom filter for case-insensitive search
    const filterOption = (option, inputValue) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase());

    // Custom option rendering with logo
    const formatOptionLabel = ({ label, logo }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
            {logo && (
                <img
                    src={`https://image.tmdb.org/t/p/w45${logo}`}
                    alt={label}
                    style={{ width: 24, marginRight: 8, borderRadius: 4 }}
                />
            )}
            <span style={{ color: "black" }}>{label}</span>
        </div>
    );

    return (
        <Select
            isMulti
            options={options}
            value={value}
            onChange={onChange}
            isLoading={loading}
            placeholder="Choose platforms..."
            closeMenuOnSelect={false}
            classNamePrefix="react-select"
            filterOption={filterOption}
            formatOptionLabel={formatOptionLabel}
        />
    );
};

export default StreamingPlatformsDropdown;