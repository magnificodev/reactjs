import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
        {/* <StarRating maxRating={10} messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} defaultRating={3}/>
        <StarRating maxRating={7}/> */}
		<App />
	</React.StrictMode>
);