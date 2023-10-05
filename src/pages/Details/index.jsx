import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { APIKey } from "../../config/key";
import { Container } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Details() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const image_path = "https://image.tmdb.org/t/p/w500/";
    const profile = "https://image.tmdb.org/t/p/w300/";

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?${APIKey}&language=en-US`)
            .then((response) => response.json())
            .then((data) => {
                const { title, overview, poster_path, release_date, vote_average } = data;

                const movie = {
                    id,
                    title,
                    sinopse: overview,
                    image: `${image_path}${poster_path}`,
                    releaseDate: release_date,
                    rate: vote_average.toString().substring(0, 3),
                };

                setMovie(movie);
            });
    }, [id]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?${APIKey}&language=en-US`)
            .then((response) => response.json())
            .then((data) => {
                const castData = data.cast.slice(0, 5);
                setCast(castData);
            });
    }, [id]);

    return (
        <Container>
            <div className="movie">
                <img src={movie.image} alt={movie.sinopse} />
                <div className="details">
                    <h1>{movie.title}</h1>
                    <span>
                        {" "}
                        <strong className="weight">Rating:</strong>{" "}
                        <FontAwesomeIcon icon={faStar} style={{ color: "#ffff00" }} /> {movie.rate}{" "}
                    </span>
                    <span>
                        {" "}
                        <strong className="weight">Sinopse:</strong> {movie.sinopse}
                    </span>
                    <span className="release-date">Release date: {movie.releaseDate}</span>

                    <div className="cast-container">
                        <div className="cast">
                            <h2>Cast</h2>
                            <div className="actors-list">
                                {cast.map((actor) => (
                                    <div key={actor.id}>
                                        <img
                                            className="actor-image"
                                            src={
                                                actor.profile_path
                                                    ? `${profile}${actor.profile_path}`
                                                    : `${profile}${movie.profile_path}`
                                            }
                                        />
                                        <span className="actor">{actor.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link to="/">
                        <button>Go back</button>
                    </Link>
                </div>
            </div>
        </Container>
    );
}

export default Details;
