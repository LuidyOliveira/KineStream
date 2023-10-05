import styled from "styled-components";

export const Container = styled.div`
    h1 {
        text-align: center;
        margin: 4rem 0;
    }
    .head-top {
        padding: 1rem;
        display: flex;
        justify-content: center;
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

    .header {
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;
        justify-content: space-around;
    }

    .link-container a {
        margin-left: 5px;
    }
    p {
        font-size: 40px;
        margin-top: 30px;
        margin-bottom: 70px;
    }
    .nav {
        list-style: none;
        padding: 0;
        display: flex;
    }

    .nav-item {
        padding: 10px;
        // border-radius: 1.5rem;
        //background-color: #6654da;
        cursor: pointer;
        color: white;
    }

    .nav-item.active {
        // border-radius: 1.5rem;
        // background-color: #9e97e8;
        color: #333333;
    }
    .underline {
        text-decoration: none;
    }
`;

export const SerieList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    column-gap: 3rem;
    row-gap: 4rem;
`;

export const Serie = styled.li`
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
