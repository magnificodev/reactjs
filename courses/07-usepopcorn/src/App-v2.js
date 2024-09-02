import { useEffect, useState } from "react";
import StarRating from "./StarRating";

// const tempMovieData = [
//     {
//         imdbID: "tt1375666",
//         Title: "Inception",
//         Year: "2010",
//         Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     },
//     {
//         imdbID: "tt0133093",
//         Title: "The Matrix",
//         Year: "1999",
//         Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//     },
//     {
//         imdbID: "tt6751668",
//         Title: "Parasite",
//         Year: "2019",
//         Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//     },
// ];

// const tempWatchedData = [
//     {
//         imdbID: "tt1375666",
//         Title: "Inception",
//         Year: "2010",
//         Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//         runtime: 148,
//         imdbRating: 8.8,
//         userRating: 10,
//     },
//     {
//         imdbID: "tt0088763",
//         Title: "Back to the Future",
//         Year: "1985",
//         Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//         runtime: 116,
//         imdbRating: 8.5,
//         userRating: 9,
//     },
// ];

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "37c4836";

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [query, setQuery] = useState("");

    const handleSelectMovie = (id) => {
        setSelectedId((selectedId) => (selectedId === id ? null : id));
    };

    const handleCloseMovie = () => {
        setSelectedId(null);
    };

    const handleAddWatchedMovie = (movie) => {
        setWatched((watched) => [...watched, movie]);
    };

    const handleDeleteWatchedMovie = (id) => {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    };

    useEffect(() => {
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
        handleCloseMovie();
        fetchMovies();

        return () => controller.abort();
    }, [query]);

    return (
        <>
            <NavBar>
                <Search query={query} onSearch={(query) => setQuery(query)} />
                <NumResults movies={movies} />
            </NavBar>
            <Main>
                <Box>
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <ErrorMessage message={error} />
                    ) : (
                        <MovieList
                            movies={movies}
                            onMovieSelected={handleSelectMovie}
                        />
                    )}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails
                            watched={watched}
                            selectedId={selectedId}
                            onMovieClosed={handleCloseMovie}
                            onMovieAdded={handleAddWatchedMovie}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatchedMovie}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}

const NavBar = ({ children }) => {
    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    );
};

const Logo = () => {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    );
};

const Search = ({ query, onSearch }) => {
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => onSearch(e.target.value)}
        />
    );
};

const NumResults = ({ movies }) => {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    );
};

const Main = ({ children }) => {
    return <main className="main">{children}</main>;
};

const Box = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <ToggleButton
                isOpen={isOpen}
                onToggle={() => setIsOpen((prev) => !prev)}
            />
            {isOpen && children}
        </div>
    );
};
const MovieList = ({ movies, onMovieSelected }) => {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <ListItem
                    key={movie.imdbID}
                    movie={movie}
                    onMovieSelected={onMovieSelected}
                />
            ))}
        </ul>
    );
};

const ListItem = ({ movie, onMovieSelected }) => {
    return (
        <li onClick={() => onMovieSelected(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
};

const MovieDetails = ({ watched, selectedId, onMovieClosed, onMovieAdded }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [movie, setMovie] = useState({});
    const [userRating, setUserRating] = useState(null);

    const ratedMovie = watched.find((movie) => movie.imdbID === selectedId);

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    const handleAddWatchedMovie = () => {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating: Number(userRating),
        };
        onMovieAdded(ratedMovie ? {} : newWatchedMovie);
        onMovieClosed();
        setUserRating(null);
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.code === "Escape") {
                onMovieClosed();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [onMovieClosed]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchMovieDetails = async () => {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
                    { signal }
                );

                if (!res.ok) {
                    throw new Error(
                        "Something went wrong with fetching the movie"
                    );
                }

                const data = await res.json();

                if (data.Response === "False") {
                    throw new Error("Cannot fetch this movie");
                }

                setMovie(data);
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (!selectedId) return;
        fetchMovieDetails();

        return () => controller.abort();
    }, [selectedId]);

    useEffect(() => {
        if (!title) return;
        document.title = `Movie | ${title}`;
        return () => {
            document.title = "usePopcorn";
        };
    }, [title]);

    return isLoading ? (
        <Loader />
    ) : error ? (
        <ErrorMessage message={error} />
    ) : (
        <div className="details">
            <header>
                <button className="btn-back" onClick={onMovieClosed}>
                    &larr;
                </button>
                <img src={poster} alt={`Poster of ${movie} movie`} />
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>
                        {released} &bull; {runtime}
                    </p>
                    <p>{genre}</p>
                    <p>
                        <span>⭐</span>
                        {`${imdbRating} IMDb Rating`}
                    </p>
                </div>
            </header>
            <section>
                <div className="rating">
                    {ratedMovie ? (
                        <p>
                            You rated with movie {ratedMovie.userRating}{" "}
                            <span>⭐</span>
                        </p>
                    ) : (
                        <>
                            <StarRating
                                size={24}
                                maxRating={10}
                                onSetRating={setUserRating}
                            />
                            {userRating && (
                                <button
                                    className="btn-add"
                                    onClick={handleAddWatchedMovie}
                                >
                                    + Add to list
                                </button>
                            )}
                        </>
                    )}
                </div>
                <p>
                    <em>{plot}</em>
                </p>
                <p>{`Starring ${actors}`}</p>
                <p>{`Directed by ${director}`}</p>
            </section>
        </div>
    );
};

const WatchedSummary = ({ watched }) => {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(0)} min</span>
                </p>
            </div>
        </div>
    );
};

const WatchedList = ({ watched, onDeleteWatched }) => {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedItem
                    key={movie.imdbID}
                    movie={movie}
                    onDeleteWatched={onDeleteWatched}
                />
            ))}
        </ul>
    );
};

const WatchedItem = ({ movie, onDeleteWatched }) => {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
                <button
                    className="btn-delete"
                    onClick={() => {
                        onDeleteWatched(movie.imdbID);
                    }}
                >
                    X
                </button>
            </div>
        </li>
    );
};

const ToggleButton = ({ isOpen, onToggle }) => {
    return (
        <button className="btn-toggle" onClick={onToggle}>
            {isOpen ? "–" : "+"}
        </button>
    );
};

const Loader = () => {
    return <p className="loader">Loading...</p>;
};

const ErrorMessage = ({ message }) => {
    return (
        <p className="error">
            <span>⛔</span>
            {message}
        </p>
    );
};
