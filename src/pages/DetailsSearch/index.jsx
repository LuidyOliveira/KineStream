import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { APIKey } from "../../config/key";
import { Container } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../assets/avatar.png";
import NoPoster from "../../assets/no-poster.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function DetailsSearch() {
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
                    image: poster_path ? `${image_path}${poster_path}` : `${NoPoster}`,
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
                <img src={movie.image || <Skeleton />} />
                <div className="details">
                    <h1>{movie.title || <Skeleton />}</h1>
                    <span>
                        {" "}
                        <strong className="weight">Rating:</strong>{" "}
                        <FontAwesomeIcon icon={faStar} style={{ color: "#ffff00" }} />{" "}
                        {movie.rate || <Skeleton />}{" "}
                    </span>
                    <span>
                        {" "}
                        <strong className="weight">Sinopse:</strong> {movie.sinopse || <Skeleton />}
                    </span>
                    <span className="release-date">
                        {movie.releaseDate ? ` Release date: ${movie.releaseDate}` : ""}
                    </span>

                    <div className="cast-container">
                        <div className="cast">
                            {cast.length >= 1 ? <h2>Cast</h2> : ""}

                            <div className="actors-list">
                                {cast.map((actor) => (
                                    <div key={actor.id}>
                                        <img
                                            className="actor-image"
                                            src={
                                                actor.profile_path
                                                    ? `${profile}${
                                                          actor.profile_path || <Skeleton />
                                                      }`
                                                    : `${Avatar}`
                                            }
                                        />
                                        <span className="actor">{actor.name || <Skeleton />}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default DetailsSearch;
