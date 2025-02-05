import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_MAP = ["7c51ce5f51b2a0e2bb3bf45b2afaa9ae","82a4b8a952e82748e2bb3eb4c3c1da59",
                        "c8bf288bee8edc7e6ac610fda396d4d4","6e06e059d8a60974c60ae9b252832ea9",
                        "853d6c433b59d29ab1768a053e895bee"]
const API_KEY = "7c51ce5f51b2a0e2bb3bf45b2afaa9ae";
const BASE_URL = "https://api.themoviedb.org/3";

const PopularMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`);
                const data = await response.json();
                setMovies(data.results.slice(0,6));
            } catch (error) {
                console.error("Erreur lors de la récupération des films :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="movies-container">
            {loading ? (
                <p>Chargement des films...</p>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <Link to={`/details/${movie.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                <h3>{movie.title}</h3>
                                <p>Note : {movie.vote_average}/10</p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PopularMovies;
