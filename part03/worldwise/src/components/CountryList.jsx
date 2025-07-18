import React from "react";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

const CountryList = ({ cities, isLoading }) => {
    if (isLoading) return <Spinner />;
    if (cities.length === 0)
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        );

    const countries = cities.reduce((cur, city, index) => {
        if (!cur.map((el) => el.country).includes(city.country))
            return [...cur, { country: city.country, emoji: city.emoji }];
        return cur
    }, []);

    return (
        countries && (
            <ul className={styles.countryList}>
                {countries.map((country, index) => (
                    <CountryItem key={index} country={country} />
                ))}
            </ul>
        )
    );
};

export default CountryList;
