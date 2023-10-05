import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, MovieList, Movie } from "./styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { APIKey } from "../../config/key";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading";

const searchUrl = "https://api.themoviedb.org/3/search/movie";

const SearchMovies = () => {
    const [searchParams] = useSearchParams();

    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const query = searchParams.get("q");

    useEffect(() => {
        fetch(`${searchUrl}?${APIKey}&query=${query}`)
            .then((response) => response.json())
            .then((data) => setMovies(data.results));
    }, [query]);

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

    const [loading, setLoading] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [location]);

    return (
        <Container>
            <h1>Results for: "{query}"</h1>
            <Link to={"/"}>
                <FontAwesomeIcon icon={faArrowLeftLong} className="back" />
            </Link>
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
                    {loading && <Loading />}
                </form>
            </div>

            {movies && movies.length === 0 && <h2>No results found</h2>}
            <MovieList>
                {movies.map((movieSearch) => {
                    return (
                        <Movie key={movieSearch.id}>
                            <Link to={`/detailsSearch/${movieSearch.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movieSearch.poster_path}`}
                                    alt={movieSearch.title}
                                />
                            </Link>
                            <span>{movieSearch.title}</span>
                        </Movie>
                    );
                })}
            </MovieList>
        </Container>
    );
};

export default SearchMovies;
