const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "books_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW1" });
});

// YOUR ENDPOINTS GO HERE

//1
const fetchAllBooks = async () => {
  let query = "select * from books";
  let result = await db.all(query, []);
  return { books: result };
};
app.get("/books", async (req, res) => {
  let results = await fetchAllBooks();
  res.status(200).json(results);
});
//books

//2
async function fetchBooksByAuthor(author) {
  let query = "select * from books where author = ?";
  let response = await db.all(query, [author]);
  return { books: response };
}
app.get("/books/author/:author", async (req, res) => {
  let author = req.params.author;
  let results = await fetchBooksByAuthor(author);
  res.status(200).json(results);
});
//books/author/George+Orwell

//3
async function fetchBooksByGenre(genre) {
  let query = "select * from books where genre = ?";
  let response = await db.all(query, [genre]);
  return { book: response };
}
app.get("/books/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  let results = await fetchBooksByGenre(genre);
  res.status(200).json(results);
});
//books/genre/Fiction

//4
async function fetchBooksByPublicationYear(year) {
  let query = "select * from books where publication_year = ?";
  let response = await db.all(query, [year]);
  return { book: response };
}
app.get("/books/publication_year/:year", async (req, res) => {
  let year = req.params.year;
  let results = await fetchBooksByPublicationYear(year);
  res.status(200).json(results);
});
//books/publication_year/1960

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
