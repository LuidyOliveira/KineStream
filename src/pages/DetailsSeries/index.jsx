import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { APIKey } from "../../config/key";
import { Container } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../assets/avatar.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function DetailsSeries() {
    const { id } = useParams();
    const [serie, setSerie] = useState({});
    const [cast, setCast] = useState([]);
    const image_path = "https://image.tmdb.org/t/p/w500/";
    const profile = "https://image.tmdb.org/t/p/w300/";

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?${APIKey}&language=en-US`)
            .then((response) => response.json())
            .then((data) => {
                const {
                    name,
                    overview,
                    poster_path,
                    first_air_date,
                    vote_average,
                    number_of_seasons,
                } = data;

                const serie = {
                    id,
                    name,
                    sinopse: overview,
                    image: `${image_path}${poster_path}`,
                    releaseDate: first_air_date,
                    rate: vote_average.toString().substring(0, 3),
                    seasons: number_of_seasons,
                };

                setSerie(serie);
            });
    }, [id]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}/credits?${APIKey}&language=en-US`)
            .then((response) => response.json())
            .then((data) => {
                const castData = data.cast.slice(0, 5);
                setCast(castData);
            });
    }, [id]);

    return (
        <Container>
            <div className="serie">
                <img src={serie.image} alt={serie.sinopse} />
                <div className="details">
                    <h1>
                        {serie.name} - {serie.seasons} Season{serie.seasons !== 1 ? "s" : ""}
                    </h1>
                    <span>
                        <strong className="weight"> Rating: </strong>{" "}
                        <FontAwesomeIcon icon={faStar} style={{ color: "#ffff00" }} />{" "}
                        {serie.rate || <Skeleton />}{" "}
                    </span>
                    <span>
                        <strong className="weight"> Sinopse: </strong>{" "}
                        {serie.sinopse || <Skeleton />}
                    </span>
                    <span className="release-date">
                        Release date: {serie.releaseDate || <Skeleton />}
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
                                                    ? `${profile}${actor.profile_path}`
                                                    : `${Avatar}` || <Skeleton />
                                            }
                                        />
                                        <span className="actor">{actor.name || <Skeleton />}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link to="/series">
                        <button>Go back</button>
                    </Link>
                </div>
            </div>
        </Container>
    );
}

export default DetailsSeries;
