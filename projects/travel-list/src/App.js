const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
    return (
        <div className="app">
            <Logo />
            <Form />
            <PackingList />
            <Stats />
        </div>
    );
}

function Logo() {
    return <h1>🏝️ Far away 🧳</h1>;
}
function Form() {
    return (
        <div className="add-form">
            <h3>What do you need for your 😍 trip?</h3>
            <select>
                <option value="1" key="">
                    1
                </option>
                <option value="2" key="">
                    2
                </option>
                <option value="3" key="">
                    3
                </option>
            </select>
            <input type="text" />
            <button>Add</button>
        </div>
    );
}
function PackingList() {
    return (
        <div className="list">
            <ul>
                {initialItems.map((item) => (
                    <Item item={item} />
                ))}
            </ul>
        </div>
    );
}
function Item({ item }) {
    return (
        <li>
            <span>
                {item.quantity} {item.description}
                <button>❌</button>
            </span>
        </li>
    );
}
function Stats() {
    return (
        <footer className="stats">
            <em>
                💼 You have 6 items on your list, and you already packed 0 (0%)
            </em>
        </footer>
    );
}
