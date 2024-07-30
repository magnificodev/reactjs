import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

function App() {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <header className="header">
            <h1>Fast React Pizza Co.</h1>
        </header>
    );
}

function Menu() {
    const pizzas = pizzaData;
    // const pizzas = [];
    const numPizzas = pizzas.length;
    return (
        <main className="menu">
            <h2>Our menu</h2>

            {!!numPizzas ? (
                <React.Fragment>
                    <p>
                        Authentic Italian cuisine. 6 creative dishes to choose
                        from. All from our stone oven, all organic, all
                        delicious
                    </p>
                    <ul className="pizzas">
                        {pizzaData.map((pizza, index) => (
                            <Pizza myPizza={pizza} key={index} />
                        ))}
                    </ul>
                </React.Fragment>
            ) : (
                <p>
                    We're still working on our menu. Please come back later ^^
                </p>
            )}
        </main>
    );
}

function Pizza({ myPizza }) {
    // if (myPizza.soldOut) return null;

    return (
        <li className={"pizza" + (myPizza.soldOut ? " sold-out" : "")}>
            <img src={myPizza.photoName} alt="Pizza spinaci" />
            <div>
                <h3>{myPizza.name}</h3>
                <p>{myPizza.ingredients}</p>
                <span>{myPizza.soldOut ? "SOLD OUT" : myPizza.price + 3}</span>
            </div>
        </li>
    );
}

function Footer() {
    const hour = new Date().getHours() + 1;
    const openHour = 12;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour <= closeHour;

    // console.log(isOpen ? "We're currently open!" : "Sorry we're closed!");

    // if (!isOpen) {
    //     return (
    //         <footer className="footer">
    //             <p>
    //                 We're happy to welcome you between {openHour}:00 to{" "}
    //                 {closeHour + 1}:00 everyday!
    //             </p>
    //         </footer>
    //     );
    // }

    return (
        <footer className="footer">
            {isOpen ? (
                <Order closeHour={closeHour} openHour={openHour} />
            ) : (
                <p>
                    We're happy to welcome you between {openHour}:00 to{" "}
                    {closeHour}:00 everyday!
                </p>
            )}
        </footer>
    );
}

const Order = ({ closeHour, openHour }) => {
    return (
        <div className="order">
            <p>
                We`re open from {openHour}:00 to {closeHour}:00. Come visit us
                or order online!
            </p>
            <button className="btn">Order</button>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
