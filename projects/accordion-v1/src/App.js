import { useState } from "react";
import "./styles.css";

const faqs = [
    {
        title: "Where are these chairs assembled?",
        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
    },
    {
        title: "How long do I have to return my chair?",
        text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
    },
    {
        title: "Do you ship to countries outside the EU?",
        text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
    },
];

export default function App() {
    return (
        <div>
            <Accordion data={faqs} />
        </div>
    );
}

function Accordion({ data }) {
    return (
        <div className="accordion">
            {data.map((el, index) => (
                <AccordionItem
                    num={index}
                    title={el.title}
                    text={el.text}
                    key={index}
                />
            ))}
        </div>
    );
}

function AccordionItem({ num, title, text }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className={"item" + (isOpen ? " open" : "")}
            onClick={() => setIsOpen((prev) => !prev)}
        >
            <span className="number">
                {num < 9 ? "0" + (num + 1) : num + 1}
            </span>
            <h1 className="title">{title}</h1>
            <span className="icon">{isOpen ? "-" : "+"}</span>

            {isOpen && <div className="content-box">{text}</div>}
        </div>
    );
}
