import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Permet de récupérer l'id depuis l'URL

const API_KEY = "7c51ce5f51b2a0e2bb3bf45b2afaa9ae";
const BASE_URL = "https://api.themoviedb.org/3";

const Details = () => {
    const { id } = useParams(); // Récupère l'id depuis l'URL
    const [details, setDetails] = useState(null);
    const [actors, setActors] = useState([]); // Stocker les 4 acteurs
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Récupérer les détails de la série
        const fetchDetails = async () => {
            try {
                const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=fr-FR`);
                const data = await response.json();
                setDetails(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails :", error);
            }
        };

        // Récupérer les acteurs de la série
        const fetchActors = async () => {
            try {
                const response = await fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=fr-FR`);
                const data = await response.json();
                setActors(data.cast.slice(0, 4)); // Prendre les 4 premiers acteurs
            } catch (error) {
                console.error("Erreur lors de la récupération du casting :", error);
            }
        };

        Promise.all([fetchDetails(), fetchActors()]).finally(() => setLoading(false));
    }, [id]);

    return (
        <div className="details-container">
            {loading ? (
                <p>Chargement des détails...</p>
            ) : details ? (
                <div>
                    <h1>{details.name}</h1>
                    <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.name} />
                    <p>{details.overview}</p>
                    <p>Note : {details.vote_average}/10</p>

                    {/* Section Casting */}
                    <h2>Acteurs Principaux</h2>
                    <div className="actors-container">
                        {actors.length > 0 ? (
                            actors.map((actor) => (
                                <div key={actor.id} className="actor-card">
                                    <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
                                    <h4>{actor.name}</h4>
                                    <p>Rôle : {actor.character}</p>
                                </div>
                            ))
                        ) : (
                            <p>Aucun acteur trouvé.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Aucune information trouvée.</p>
            )}
        </div>
    );
};
export default Details;
