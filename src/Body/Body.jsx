import React from "react";
import "./Body.css";

const Body = ({ books }) => {
  const addToShelf = (book) => {
    try {
      // Retrieve the current list of books from localStorage
      const currentBooks = localStorage.getItem("books");

      // Parse the current books array if it exists, otherwise use an empty array
      const booksArray = currentBooks ? JSON.parse(currentBooks) : [];

      const bookExists = booksArray.some(
        (existingBook) => existingBook.title === book.title
      );

      if (bookExists) {
        console.log("Book with the same title already exists on the shelf.");
        return; // Exit the function if the book already exists
      }

      // Add the new book to the array
      booksArray.push(book);

      // Store the updated array back into localStorage
      localStorage.setItem("books", JSON.stringify(booksArray));
    } catch (e) {
      if (
        e.name === "QuotaExceededError" ||
        e.name === "NS_ERROR_DOM_QUOTA_REACHED"
      ) {
        console.error(
          "LocalStorage quota exceeded. Consider clearing some storage or use a different storage method."
        );
        // Optionally, you could notify the user or handle this situation appropriately in your application
      } else {
        console.error("An error occurred while accessing localStorage:", e);
      }
    }
  };

  return (
    <main className="books-container flex-center flex-col">
      <div className="flex flex-center search-results">
        <div className="">Search results:</div>
        <div className="matching">{books.length} matching</div>
      </div>
      <div className="books-grid">
        {books &&
          books.map((book, i) => {
            const rating = isNaN(book.ratings_average)
              ? 0
              : Math.floor(book.ratings_average);
            return (
              <div
                key={i}
                className="book-item flex-center flex-col transition-scale"
              >
                <div className="book-title">{book.title}</div>
                <div className="book-release">{book.first_publish_year}</div>
                <div>
                  by{" "}
                  <span className="author-name">
                    {book.author_name && book.author_name[0]}
                  </span>
                </div>
                <div className="book-ratings">
                  {[...Array(Number(rating))].map((e, i) => (
                    <span key={i} className="fa fa-star checked"></span>
                  ))}
                  {[...Array(Number(5 - rating))].map((e, i) => (
                    <span key={i} className="fa fa-star unchecked"></span>
                  ))}
                </div>
                <span
                  onClick={() => {
                    addToShelf(book);
                  }}
                  className="fa fa-plus-square transition-scale add-button"
                  aria-hidden="true"
                  style={{ fontSize: "25px" }}
                ></span>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default Body;
