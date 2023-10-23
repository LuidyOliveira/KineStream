import { Container, SerieList, Serie } from "./styles";
import { useState, useEffect, useRef } from "react";
import { APIKey } from "../../config/key";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CardSkeleton from "../CardSkeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Series() {
    const image_path = "https://image.tmdb.org/t/p/w500";
    const [series, setSeries] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/top_rated?${APIKey}&language=en-US&page=1`)
            .then((response) => response.json())
            .then((data) => setSeries(data.results));
        setIsLoading(false);
    }, []);

    const [activePage, setActivePage] = useState(1);
    const handleSetActivePage = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const inputRef = useRef(null);
    const handleIconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!search) return;

        navigate(`/searchMovies?q=${search}`);
        setSearch("");
    };

    return (
        <Container>
            <div className="head-top">
                <form onSubmit={handleSubmit}>
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="icon"
                        onClick={handleIconClick}
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        className="search"
                        ref={inputRef}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </form>
            </div>

            <div className="header nav">
                <Link to="/" className="underline">
                    <p
                        className={`nav-item ${activePage === 2 ? "active" : ""}`}
                        onClick={() => handleSetActivePage(1)}
                    >
                        Movies
                    </p>
                </Link>
                <div className="link-container">
                    <p
                        className={`nav-item ${activePage === 1 ? "active" : ""}`}
                        onClick={() => handleSetActivePage(2)}
                    >
                        Series
                    </p>
                </div>
            </div>
            <SerieList>
                {isLoading && <CardSkeleton cards={20} />}
                {series.map((serie) => {
                    return (
                        <Serie key={serie.id}>
                            <Link to={`/DetailsSeries/${serie.id}`}>
                                <img src={image_path + serie.poster_path} alt={serie.name} />
                            </Link>
                            <span>{serie.name}</span>
                        </Serie>
                    );
                })}
            </SerieList>
        </Container>
    );
}

export default Series;
