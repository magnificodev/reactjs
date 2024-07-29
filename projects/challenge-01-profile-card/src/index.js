import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const App = () => {
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

    return (
        <div className="card">
            <Avatar photoLink={profile.photoLink} />
            <div className="data">
                <Intro
                    introduction={profile.introduction}
                    name={profile.name}
                />
                <SkillList skills={profile.skills} />
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

const Skill = (props) => {
    return (
        <li style={{backgroundColor: props.backColor}} className="skill">
            <span>{props.skill}</span>
            <span>{props.emoji}</span>
        </li>
    );
};

const SkillList = (props) => {
    return (
        <ul className="skill-list">
            <Skill skill={props.skills[0]} emoji="💪" backColor="green"/>
            <Skill skill={props.skills[1]} emoji="💪" backColor="blue"/>
            <Skill skill={props.skills[2]} emoji="💪" backColor="red"/>
            <Skill skill={props.skills[3]} emoji="👍" backColor="yellow"/>
            <Skill skill={props.skills[4]} emoji="💪" backColor="orange"/>
            <Skill skill={props.skills[5]} emoji="👶" backColor="pink"/>
        </ul>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
