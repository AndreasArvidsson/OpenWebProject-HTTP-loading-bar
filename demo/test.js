console.log("test.js");

import React, { useState } from "react";
import ReactDOM from "react-dom";
import HTTP from "owp.http";
import HttpLoadingBar from "../index";

function doGet() {
    HTTP.get("https://api.github.com/rate_limit")
        .then(console.log)
        .catch(console.error);
}

const App = () => {
    const [color, setColor] = useState();
    return (
        <React.Fragment>
            <HttpLoadingBar color={color || undefined} />
            <div>
                <h1>owp.htttp-loading-bar</h1>
                <input
                    type="text"
                    placeholder="color"
                    value={color || ""}
                    onChange={e => setColor(e.target.value)}
                />
                &nbsp;
                <button onClick={doGet}>
                    Try
                </button>
            </div>
        </React.Fragment>
    );
}

ReactDOM.render(
    <main>
        <App />
    </main>,
    document.getElementById("root")
);