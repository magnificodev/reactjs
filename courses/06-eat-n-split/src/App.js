import { useState } from "react";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

export default function App() {
    const [friends, setFriends] = useState(initialFriends);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [selectFriend, setSelectFriend] = useState(null);

    const handleShowAddFriend = () => {
        setIsAddOpen((prev) => !prev);
    };

    const handleAddFriend = (newFriend) => {
        setFriends((prev) => [...prev, newFriend]);
        setIsAddOpen(false);
    };

    const handleSelectFriend = (friend) => {
        setSelectFriend((cur) => (cur?.id === friend.id ? null : friend));
        isAddOpen && setIsAddOpen(false);
    };

    const handleUpdateBalance = (balance) => {
        setFriends((friends) =>
            friends.map((friend) =>
                friend.id === selectFriend.id
                    ? { ...friend, balance: friend.balance + balance }
                    : friend
            )
        );
        setSelectFriend(null);
    };

    return (
        <div className="app">
            <div className="sidebar">
                <FriendList
                    friends={friends}
                    onSelectFriend={handleSelectFriend}
                    selectFriend={selectFriend}
                />
                {isAddOpen && <FormAddFriend onAddFriend={handleAddFriend} />}
                <Button onClick={handleShowAddFriend}>
                    {isAddOpen ? "Close" : "Add friend"}
                </Button>
            </div>
            {selectFriend && (
                <FormSplitBill
                    key={selectFriend.id}
                    selectFriend={selectFriend}
                    onSelectFriend={handleSelectFriend}
                    onUpdateBalance={handleUpdateBalance}
                />
            )}
        </div>
    );
}

function FriendList({ friends, selectFriend, onSelectFriend }) {
    return (
        <ul>
            {friends.map((friend) => (
                <Friend
                    friend={friend}
                    key={friend.id}
                    selectFriend={selectFriend}
                    onSelectFriend={onSelectFriend}
                />
            ))}
        </ul>
    );
}

function Friend({ friend, selectFriend, onSelectFriend }) {
    const isSelect = selectFriend?.id === friend.id;
    return (
        <li className={isSelect ? "selected" : null}>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            <p
                className={
                    friend.balance < 0
                        ? "red"
                        : friend.balance > 0
                        ? "green"
                        : ""
                }
            >
                {friend.balance < 0
                    ? `You owe ${friend.name} ${friend.balance * -1}€`
                    : friend.balance > 0
                    ? `${friend.name} owes you ${friend.balance}€`
                    : `You and ${friend.name} are even`}
            </p>
            <Button onClick={() => onSelectFriend(friend)}>
                {isSelect ? "Close" : "Select"}
            </Button>
        </li>
    );
}

function Button({ onClick, children }) {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
}

function FormAddFriend({ onAddFriend }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = crypto.randomUUID();
        if (!name || !image) return;
        const newFriend = {
            id,
            name,
            image: `${image}?=${id}`,
            balance: 0,
        };
        onAddFriend(newFriend);
    };

    return (
        <form className="form-add-friend" onSubmit={handleSubmit}>
            <label>🧑‍🤝‍🧑Friend name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label>🏞️Image URL</label>
            <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />

            <Button>Add</Button>
        </form>
    );
}

function FormSplitBill({ selectFriend, onSelectFriend, onUpdateBalance }) {
    const [bill, setBill] = useState();
    const [userExpenses, setUserExpenses] = useState();
    const [payPerson, setPayPerson] = useState("user");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!bill || !userExpenses) return;

        onUpdateBalance(
            payPerson === "user" ? bill - userExpenses : userExpenses * -1
        );

        onSelectFriend({});
    };

    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split a bill with {selectFriend?.name}</h2>

            <label>💰Bill value</label>
            <input
                type="number"
                value={bill ?? ""}
                onChange={(e) => {
                    if (e.target.value === "") {
                        setBill(undefined);
                    } else {
                        setBill(
                            Number(e.target.value) < userExpenses
                                ? bill
                                : Number(e.target.value)
                        );
                    }
                }}
            />

            <label>🧍Your expenses</label>
            <input
                type="number"
                value={userExpenses ?? ""}
                onChange={(e) => {
                    if (e.target.value === "") {
                        setUserExpenses(undefined);
                    } else {
                        setUserExpenses(
                            Number(e.target.value) > bill
                                ? userExpenses
                                : Number(e.target.value)
                        );
                    }
                }}
            />

            <label>🧑‍🤝‍🧑{selectFriend.name}'s expenses</label>
            <input
                type="number"
                value={bill - userExpenses >= 0 ? bill - userExpenses : ""}
                disabled
            />

            <label>🤑Who is paying the bill?</label>
            <select
                value={payPerson}
                onChange={(e) => setPayPerson(e.target.value)}
            >
                <option value="user">You</option>
                <option value="friend">{selectFriend.name}</option>
            </select>

            <Button>Split bill</Button>
        </form>
    );
}
