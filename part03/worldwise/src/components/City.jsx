import { useState, useEffect } from "react";
import styles from "./City.module.css";
import { useParams, useSearchParams } from "react-router-dom";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

function City() {
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    // TEMP DATA
    // const currentCity = {
    //     cityName: "Lisbon",
    //     emoji: "🇵🇹",
    //     date: "2027-10-31T15:59:59.138Z",
    //     notes: "My favorite city so far!",
    // };

    // // const { cityName, emoji, date, notes } = currentCity;

    // const [city, setCity] = useState(null);

    // const { cityId } = useParams();
    // console.log("cityId", cityId);

    // useEffect(() => {
    //     const fetchCity = async () => {
    //         try {
    //             const response = await fetch(
    //                 `http://localhost:3000/cities/${cityId}`
    //             );
    //             const city = await response.json();
    //             setCity(city);
    //         } catch (err) {
    //             console.error(err.message);
    //         }
    //     };
    //     fetchCity();
    // }, [cityId]);

    // // return <h1>City</h1>

    // return (
    //     city && (
    //         <div className={styles.city}>
    //             <div className={styles.row}>
    //                 <h6>City name</h6>
    //                 <h3>
    //                     <span>{emoji}</span> {cityName}
    //                 </h3>
    //             </div>

    //             <div className={styles.row}>
    //                 <h6>You went to {cityName} on</h6>
    //                 <p>{formatDate(date || null)}</p>
    //             </div>

    //             {notes && (
    //                 <div className={styles.row}>
    //                     <h6>Your notes</h6>
    //                     <p>{notes}</p>
    //                 </div>
    //             )}

    //             <div className={styles.row}>
    //                 <h6>Learn more</h6>
    //                 <a
    //                     href={`https://en.wikipedia.org/wiki/${cityName}`}
    //                     target="_blank"
    //                     rel="noreferrer"
    //                 >
    //                     Check out {cityName} on Wikipedia &rarr;
    //                 </a>
    //             </div>

    //             {/* <div>
    //             <ButtonBack />
    //         </div> */}
    //         </div>
    //     )
    // );

    return (
        <>
            <h1>City</h1>
            <p>
                Position: {lat}, {lng}
            </p>
        </>
    );
}

export default City;
