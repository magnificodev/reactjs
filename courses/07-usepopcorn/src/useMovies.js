import { useState, useEffect } from "react";

const KEY = "37c4836";

export const useMovies = (query) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // callback?.();

        const controller = new AbortController();
        const signal = controller.signal;
        const fetchMovies = async () => {
            try {
                setError("");
                setIsLoading(true);
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    { signal }
                );

                if (!res.ok) {
                    throw new Error(
                        "Something went wrong with fetching movies"
                    );
                }

                const data = await res.json();

                if (data.Response === "False") {
                    throw new Error("Cannot find any movie");
                }
                setMovies(data.Search);
            } catch (error) {
                if (error.name !== "AbortError") setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (!query) {
            setMovies([]);
            setError("");
            return;
        }
        fetchMovies();

        return () => controller.abort();
    }, [query]);

    return { movies, isLoading, error };
};
