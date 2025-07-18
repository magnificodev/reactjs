import React from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

const Map = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    return (
        <div className={styles.mapContainer}>
            <h1>Map</h1>
            <h1>
                Position: {lat}:{lng}
            </h1>
            <button
                onClick={() => {
                    setSearchParams({
                        lat: "9.4324324",
                        lng: "10.424343243"
                    });
                }}
            >
                Change position
            </button>
        </div>
    );
};

export default Map;
