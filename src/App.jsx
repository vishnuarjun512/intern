import { useEffect, useState } from "react";
import Body from "./Body/Body";
import Navbar from "./Navbar/Navbar";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyShelf from "./Body/MyShelf";

const BodyWrapper = ({ setBooks, books }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getBooks = async (queryString) => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://openlibrary.org/search.json?q=${queryString}&limit=20&page=1`
        );
        setBooks(res.data.docs);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };
    getBooks("Love");
  }, []);

  if (loading) {
    return (
      <div className="flex-center loading">
        <p>Loading....</p>
      </div>
    );
  }

  if (error) {
    return <div className="flex-center error">Error: {error.message}</div>;
  }

  return (
    <div className="container flex-center flex-col">
      {books && <Body books={books} />}
    </div>
  );
};

function App() {
  const [query, setQuery] = useState(null);
  const [books, setBooks] = useState([]);

  return (
    <BrowserRouter>
      <Navbar setBooks={setBooks} query={query} setQuery={setQuery} />
      <Routes>
        <Route
          path="/"
          element={<BodyWrapper setBooks={setBooks} books={books} />}
        />
        <Route path="/mybooks" element={<MyShelf books={books} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
