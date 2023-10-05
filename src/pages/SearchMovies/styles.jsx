import styled from "styled-components";

export const Container = styled.div`
    h1 {
        text-align: center;
        color: #a9a9a9;
    }
    h2 {
        font-size: 3rem;
        display: flex;
        text-align: center;
        justify-content: center;
        margin: 15rem 0;
        color: #a9a9a9;
    }
    .head-top {
        padding: 1rem;
        display: flex;
        justify-content: center;
        padding-bottom: 6rem;
    }
    .search {
        background-color: transparent;
        border: 2px solid transparent;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 1.5rem;
        color: white;
    }
    .icon {
        font-size: 1.6rem;
        height: 2.2rem;
        padding-right: 0.3rem;
        position: relative;
        top: 0.6rem;
    }
    .back {
        color: white;
        font-size: 1.6rem;
        height: 3.1rem;
        padding-right: 0.3rem;
        position: relative;
        top: 4.2rem;
        left: 1.3rem;
        cursor: pointer;
        transition: all 0.3s;
    }
    .back:hover {
        transform: scale(1.1);
    }
    .loading {
        position: fixed;
        left: 0;
        top: 10rem;
        right: 0;
        bottom: 0;
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const MovieList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    column-gap: 3rem;
    row-gap: 4rem;
`;

export const Movie = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 180px;
        border-radius: 1rem;
        margin-bottom: 2rem;
    }
    span {
        font-weight: bold;
        font-size: 120%;
        text-align: center;
    }
    a {
        transition: all 0.3s;
    }
    a:hover {
        transform: scale(1.1);
    }
`;
