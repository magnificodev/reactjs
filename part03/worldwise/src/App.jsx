import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";

const App = () => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCities = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("http://localhost:3000/cities");
                const cities = await response.json();
                setCities(cities);
            } catch (err) {
                console.error(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCities();
    }, []);

    return (
        <Routes>
            <Route index element={<Homepage />} />
            <Route path="/product" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<AppLayout />}>
                <Route
                    index
                    element={<CityList cities={cities} isLoading={isLoading} />}
                />
                <Route
                    path="cities"
                    element={<CityList cities={cities} isLoading={isLoading} />}
                />
                <Route
                    path="cities/:cityId"
                    element={<City />}
                />
                <Route
                    path="countries"
                    element={
                        <CountryList cities={cities} isLoading={isLoading} />
                    }
                />
                <Route path="form" element={<p>Form</p>} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default App;
