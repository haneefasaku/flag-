import React, { useState, useEffect } from 'react';

const url = "https://restcountries.com/v3.1/all";

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCountryData = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const countries = await response.json();
            setCountries(countries);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountryData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Countries</h1>
            <ul>
                {countries.map((country) => (
                    <li key={country.cca3}>{country.name.common}</li>
                ))}
            </ul>
        </div>
    );
};

export default Countries;
