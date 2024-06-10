import React, { useEffect, useState } from "react";
import Books from "./Books";

const MyShelf = () => {
  const [myBooks, setMyBooks] = useState([]);
  useEffect(() => {
    const getMyBooks = () => {
      const res = JSON.parse(localStorage.getItem("books"));
      setMyBooks(res);
    };
    getMyBooks();
  }, []);
  return (
    <div className="flex-center flex-col">
      <h1>My Books</h1>
      <Books setMyBooks={setMyBooks} books={myBooks} />
    </div>
  );
};

export default MyShelf;
