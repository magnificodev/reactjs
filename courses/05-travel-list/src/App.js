import { useState } from "react";
import Logo from "./components/Logo"
import Form from "./components/Form"
import PackingList from "./components/PackingList"
import Stats from "./components/Stats"

export default function App() {
    const [items, setItems] = useState([]);

    const handleAddItems = (newItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    };

    const handleDeleteItem = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleToggleItem = (id) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    };

    const handleClearList = () => {
        const confirmed = window.confirm("Are you sure you want to delete all items")
        if (confirmed)
            setItems([]);
    };

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onToggleItem={handleToggleItem}
                onClearList={handleClearList}
            />
            <Stats items={items} />
        </div>
    );
}