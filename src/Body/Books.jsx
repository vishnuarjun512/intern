import React from "react";
import "./Body.css";

const Books = ({ books, setMyBooks }) => {
  const removeFromShelf = (book) => {
    const newBooks = books.filter((item) => book.title !== item.title);
    setMyBooks(newBooks);
    localStorage.setItem("books", JSON.stringify(newBooks));
  };

  return (
    <div className="books-grid">
      {books.length === 0 && (
        <div className="empty-mybooks">
          You haven't owned any Books, try again later
        </div>
      )}
      {books &&
        books.map((book, i) => {
          const rating = book.ratings_average.toFixed(0);
          return (
            <div
              key={i}
              className="book-item flex-center flex-col transition-scale"
            >
              <div className="book-title">{book.title}</div>
              <div className="book-release">{book.first_publish_year}</div>
              <div>
                by <span className="author-name">{book.author_name[0]}</span>
              </div>
              <div className="book-ratings">
                {[...Array(Number(rating))].map((e, i) => (
                  <span key={i} className="fa fa-star checked"></span>
                ))}
                {[...Array(Number(5 - rating))].map((e, i) => (
                  <span key={i} class="fa fa-star unchecked"></span>
                ))}
              </div>
              <span
                onClick={() => {
                  removeFromShelf(book);
                }}
                className="fa fa-minus-square transition-scale add-button"
                aria-hidden="true"
                style={{ fontSize: "25px" }}
              ></span>
            </div>
          );
        })}
    </div>
  );
};

export default Books;
