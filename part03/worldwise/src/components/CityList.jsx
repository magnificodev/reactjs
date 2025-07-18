import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

const CityList = ({ cities, isLoading }) => {

    if (isLoading) return <Spinner />;
    if (cities.length === 0)
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        );
    return (
        cities && (
            <ul className={styles.cityList}>
                {cities.map((city, index) => (
                    <CityItem key={index} city={city} />
                ))}
            </ul>
        )
    );
};

export default CityList;
