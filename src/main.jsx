import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css"
import Home from "./pages/Home";
import Series from "./pages/Series";
import Details from "./pages/Details";
import DetailsSeries from "./pages/DetailsSeries";
import DetailsSearch from "./pages/DetailsSearch";
import SearchMovies from "./pages/SearchMovies";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <SkeletonTheme baseColor="#f3f3f3" highlightColor="#444">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/series" element={<Series />} />
                    <Route path="searchMovies" element={<SearchMovies />} />
                    <Route path="/details/:id" element={<Details />} />
                    <Route path="/detailsSeries/:id" element={<DetailsSeries />} />
                    <Route path="/detailsSearch/:id" element={<DetailsSearch />} />
                </Routes>
            </BrowserRouter>
        </SkeletonTheme>
    </React.StrictMode>
);