import { Container, MovieList, Movie } from "./styles";
import { useState, useEffect, useRef } from "react";
import { APIKey } from "../../config/key";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Home() {
    const image_path = "https://image.tmdb.org/t/p/w500";
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?${APIKey}&language=en-US&page=1`)
            .then((response) => response.json())
            .then((data) => setMovies(data.results));
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
                <p
                    className={`nav-item ${activePage === 1 ? "active" : ""}`}
                    onClick={() => handleSetActivePage(1)}
                >
                    Movies
                </p>
                <div className="link-container">
                    <Link to="/series" className="underline">
                        <p
                            className={`nav-item ${activePage === 2 ? "active" : ""}`}
                            onClick={() => handleSetActivePage(2)}
                        >
                            Series
                        </p>
                    </Link>
                </div>
            </div>
            <MovieList>
                {movies.map((movie) => {
                    return (
                        <Movie key={movie.id}>
                            <Link to={`/details/${movie.id}`}>
                                <img src={image_path + movie.poster_path} alt={movie.title} />
                            </Link>
                            <span>{movie.title}</span>
                        </Movie>
                    );
                })}
            </MovieList>
        </Container>
    );
}

export default Home;
