import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_MAP = [
    "7c51ce5f51b2a0e2bb3bf45b2afaa9ae",
    "82a4b8a952e82748e2bb3eb4c3c1da59",
    "c8bf288bee8edc7e6ac610fda396d4d4",
    "6e06e059d8a60974c60ae9b252832ea9",
    "853d6c433b59d29ab1768a053e895bee"
];

const API_KEY = "7c51ce5f51b2a0e2bb3bf45b2afaa9ae";

const BASE_URL = "https://api.themoviedb.org/3";

const PopularTv = () => {
    // État pour stocker les séries populaires (tvs = liste des séries, setTv = fonction pour les mettre à jour)
    const [tvs, setTv] = useState([]);
    // État pour savoir si on est encore en train de charger les données
    const [loading, setLoading] = useState(true);

    // useEffect = Exécute du code dès que le composant est affiché à l'écran
    useEffect(() => {
        const fetchTv = async () => {
            try {
                // On fait une requête pour récupérer les séries les mieux notées en français
                const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=fr-FR&page=1`);
                const data = await response.json();
                // On garde seulement les 6 premières séries (sinon c'est trop long)
                setTv(data.results.slice(0,6));
            } catch (error) {
                // Si jamais y'a un problème, on affiche un message d'erreur dans la console
                console.error("Erreur lors de la récupération des séries :", error);
            } finally {
                // Quoi qu'il arrive, on arrête le chargement
                setLoading(false);
            }
        };

        // On appelle la fonction pour aller chercher les séries
        fetchTv();
    }, []); // Le tableau vide [] veut dire que ça ne s'exécute qu'une seule fois au chargement

    return (
        <div className="tv-container">
            {loading ? ( // Si ça charge encore, on affiche un message
                <p>Chargement des séries...</p>
            ) : ( // Sinon, on affiche la liste des séries
                <div className="tv-grid">
                    {tvs.map((tv) => ( // Pour chaque série récupérée, on affiche une "carte"
                        <div key={tv.id} className="tv-card">
                            <Link to={`/details/${tv.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt={tv.title} />
                                <h3>{tv.title}</h3>
                                <p>Note : {tv.vote_average}/10</p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// On exporte le composant pour pouvoir l'utiliser ailleurs dans le projet
export default PopularTv;
