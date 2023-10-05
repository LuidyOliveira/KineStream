import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { APIKey } from "../../config/key";
import { Container } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function DetailsSeries() {
    const { id } = useParams();
    const [serie, setSerie] = useState({});
    const image_path = "https://image.tmdb.org/t/p/w500/";

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
                        <FontAwesomeIcon icon={faStar} style={{ color: "#ffff00" }} /> {serie.rate}{" "}
                    </span>
                    <span>
                        <strong className="weight"> Sinopse: </strong> {serie.sinopse}
                    </span>
                    <span className="release-date">Release date: {serie.releaseDate}</span>
                    <Link to="/series">
                        <button>Go back</button>
                    </Link>
                </div>
            </div>
        </Container>
    );
}

export default DetailsSeries;
