import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const profile = {
    name: "Tom Holland",
    photoLink: "./image.png",
    introduction:
        "Full-stack web developer and teacher at Udemy. When not coding or preparing a course, I like to play board games, to cook (and eat), or to just enjoy the Portuguese sun at beach.",
    skills: [
        "HTML+CSS",
        "Javascript",
        "Web Design",
        "Git and Github",
        "React",
        "Svelte",
    ],
};

const skills = [
    {
        skill: "HTML+CSS",
        level: "advanced",
        color: "#2662EA",
    },
    {
        skill: "JavaScript",
        level: "advanced",
        color: "#EFD81D",
    },
    {
        skill: "Web Design",
        level: "advanced",
        color: "#C3DCAF",
    },
    {
        skill: "Git and GitHub",
        level: "intermediate",
        color: "#E84F33",
    },
    {
        skill: "React",
        level: "advanced",
        color: "#60DAFB",
    },
    {
        skill: "Svelte",
        level: "beginner",
        color: "#FF3B00",
    },
];

// Object is used for mapping level to emoji
const emojis = {
    beginner: "👶",
    intermediate: "👍",
    advanced: "💪"
}

const App = () => {
    return (
        <div className="card">
            <Avatar photoLink={profile.photoLink} />
            <div className="data">
                <Intro
                    introduction={profile.introduction}
                    name={profile.name}
                />
                <SkillList />
            </div>
        </div>
    );
};

const Avatar = (props) => {
    return <img className="avatar" src={props.photoLink} alt="Avatar" />;
};

const Intro = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
            <p>{props.introduction}</p>
        </div>
    );
};

const SkillList = () => {
    return (
        <ul className="skill-list">
            {skills.map((skill) => (
                <Skill skill={skill} />
            ))}
        </ul>
    );
};

const Skill = ({ skill }) => {
    
    return (
        <li style={{ backgroundColor: skill.color }} className="skill">
            <span>{skill.skill}</span>
            <span>
                {/* {skill.level === "beginner"
                    ? "👶"
                    : skill.level === "intermediate"
                    ? "👍"
                    : "💪"} */}
                    {emojis[skill.level]}
            </span>
        </li>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
