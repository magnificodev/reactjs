/*
const data = [
    {
        id: 1,
        title: "The Lord of the Rings",
        publicationDate: "1954-07-29",
        author: "J. R. R. Tolkien",
        genres: [
            "fantasy",
            "high-fantasy",
            "adventure",
            "fiction",
            "novels",
            "literature",
        ],
        hasMovieAdaptation: true,
        pages: 1216,
        translations: {
            spanish: "El señor de los anillos",
            chinese: "魔戒",
            french: "Le Seigneur des anneaux",
        },
        reviews: {
            goodreads: {
                rating: 4.52,
                ratingsCount: 630994,
                reviewsCount: 13417,
            },
            librarything: {
                rating: 4.53,
                ratingsCount: 47166,
                reviewsCount: 452,
            },
        },
    },
    {
        id: 2,
        title: "The Cyberiad",
        publicationDate: "1965-01-01",
        author: "Stanislaw Lem",
        genres: [
            "science fiction",
            "humor",
            "speculative fiction",
            "short stories",
            "fantasy",
        ],
        hasMovieAdaptation: false,
        pages: 295,
        translations: {},
        reviews: {
            goodreads: {
                rating: 4.16,
                ratingsCount: 11663,
                reviewsCount: 812,
            },
            librarything: {
                rating: 4.13,
                ratingsCount: 2434,
                reviewsCount: 0,
            },
        },
    },
    {
        id: 3,
        title: "Dune",
        publicationDate: "1965-01-01",
        author: "Frank Herbert",
        genres: ["science fiction", "novel", "adventure"],
        hasMovieAdaptation: true,
        pages: 658,
        translations: {
            spanish: "",
        },
        reviews: {
            goodreads: {
                rating: 4.25,
                ratingsCount: 1142893,
                reviewsCount: 49701,
            },
        },
    },
    {
        id: 4,
        title: "Harry Potter and the Philosopher's Stone",
        publicationDate: "1997-06-26",
        author: "J. K. Rowling",
        genres: ["fantasy", "adventure"],
        hasMovieAdaptation: true,
        pages: 223,
        translations: {
            spanish: "Harry Potter y la piedra filosofal",
            korean: "해리 포터와 마법사의 돌",
            bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
            portuguese: "Harry Potter e a Pedra Filosofal",
        },
        reviews: {
            goodreads: {
                rating: 4.47,
                ratingsCount: 8910059,
                reviewsCount: 140625,
            },
            librarything: {
                rating: 4.29,
                ratingsCount: 120941,
                reviewsCount: 1960,
            },
        },
    },
    {
        id: 5,
        title: "A Game of Thrones",
        publicationDate: "1996-08-01",
        author: "George R. R. Martin",
        genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
        hasMovieAdaptation: true,
        pages: 835,
        translations: {
            korean: "왕좌의 게임",
            polish: "Gra o tron",
            portuguese: "A Guerra dos Tronos",
            spanish: "Juego de tronos",
        },
        reviews: {
            goodreads: {
                rating: 4.44,
                ratingsCount: 2295233,
                reviewsCount: 59058,
            },
            librarything: {
                rating: 4.36,
                ratingsCount: 38358,
                reviewsCount: 1095,
            },
        },
    },
];

function getBooks() {
    return data;
}

function getBook(id) {
    return data.find((d) => d.id === id);
}

const book = getBook(1);
const books = getBooks();
console.log(book);

// Destructuring
const { id, title, genres, pages } = getBook(1);
console.log(id, title, genres);

// Rest Operator
const [primaryGerne, secondaryGerne, ...otherGenres] = genres;
console.log(primaryGerne, secondaryGerne, otherGenres);

// Spread Operator
const newGenres = [...genres, "epic fantasy"];
console.log(newGenres);

const updatedBook = { ...book, publicationDate: "2024-07-26", pages: 1210 };
console.log(updatedBook);

// Template Literals
const summary = `A book with id ${id} has ${pages} pages`;
console.log(summary);

// Ternaries
const hasMovie = book.hasMovieAdaptation ? "Yes" : "No";
console.log("Does it have a movie?", hasMovie);

// Arrow function
const getYear = (book) => book.publicationDate.split("-")[0];
console.log(`This book was published in ${getYear(book)}`);

// Short-circuiting & Logical Operators
const isAuthenticated = true;
const hasPermission = "admin";
const canAccess = isAuthenticated && hasPermission;
console.log(canAccess);

const isTranslatedToSpanish = book.translations.portuguese;
console.log(
    (isTranslatedToSpanish && "This book is translated to Spanish") ||
        "This book is not translated to Spanish"
);

// Optional Chaining
const getTotalReviewCount = (book) => {
    const goodreads = book.reviews.goodreads?.reviewsCount ?? 0;
    const librarything = book.reviews.librarything?.reviewsCount ?? 0;
    return goodreads + librarything;
};

console.log(getTotalReviewCount(getBook(1)));

// Array map method
const myBookObj = data.map((book) => {
    console.log(`${book.id} - ${book.title}`);
    return {
        id: book.id,
        title: book.title,
        reviewCount: getTotalReviewCount(book),
    };
});
console.log(myBookObj);

const myArr = [1, 2, 0, 3, 4, 9, 12, 6].map((value) => {
    console.log(value);
    return value * 2;
});
console.log(myArr);

// Array filter method
const longBooks = books
    .filter((book) => book.pages >= 500)
    .map((longBook) => {
        console.log(longBook.title);
    });

const adventureBooks = books
    .filter((book) => book.genres.includes("adventure"))
    .map((adventureBook) => {
        console.log(adventureBook.title);
    });

// Array reduce method
const pagesAllBooks = books.reduce((prev, curr) => prev + curr.pages, 0);
console.log(`Total pages are ${pagesAllBooks}`);

// Array sort method
const myUnsortedArr = [12, 4, 8, 9, 7, 3, 1, 0, 2];
console.log(myUnsortedArr.slice().sort((a, b) => a - b));

const sortedByPages = books
    .slice()
    .sort((a, b) => a.pages - b.pages)
    .map((value) => {
        console.log(value.id);
    });

// Working With Immutable Arrays
const newBook = {
    id: 6,
    title: "Harry Potter and the Chamber of Secrets",
    author: "J. K. Rowling",
};

const bookAfterAdd = [...books, newBook];
console.log(bookAfterAdd);

// - Delete book object from the array
const booksAfterDelete = bookAfterAdd.filter((book) => book.id !== 3);
console.log(booksAfterDelete);

// - Update book object in the array
const booksAfterUpdate = booksAfterDelete.map((book) =>
    book.id === 1 ? { ...book, author: "Magnifico" } : book
);
console.log(booksAfterUpdate);
*/

// Asynchronous Javascript Promises
// fetch("https://jsonplaceholder.typicode.com/todos/1")
//     .then((response) => response.json())
//     .then((data) => console.log(data));

// console.log("Hello World");

// Asynchronous Javascript Async/Await
async function getTodos() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await res.json();
    console.log(data);
    console.log("Hello World!");
    return data;
}

const todo = await getTodos();
console.log(todo)
console.log("Magnifico");
