import React, { useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDebounce } from "./debounce";

const Navbar = ({ setBooks, query, setQuery }) => {
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(query, 1000);

  useEffect(() => {
    const getBooks = async (queryString) => {
      try {
        const res = await axios.get(
          `https://openlibrary.org/search.json?q=${queryString}&limit=20&page=1`
        );
        setBooks(res.data.docs);
      } catch (err) {
        console.error(err);
      }
    };

    if (!debouncedSearch) {
      return;
    }

    console.log(debouncedSearch);

    getBooks(debouncedSearch);
  }, [debouncedSearch, setBooks]);

  return (
    <nav className="navbar flex-center">
      <div
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      >
        Bookie Cookie
      </div>
      <div className="center-navbar flex-center">
        <input
          placeholder="Search for books ...."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          type="text"
          className="search-input transition-scale"
        />
        <p className="search-button transition-scale">Search</p>
      </div>
      <div className="right-navbar flex-center">
        <span
          className="transition-scale nav-item"
          onClick={() => {
            navigate("/mybooks");
          }}
        >
          My Bookshelf
        </span>
        <span className="transition-scale nav-item">Profile</span>
      </div>
    </nav>
  );
};

export default Navbar;
