console.log("test.js");

import { useState } from "react";
import ReactDOM from "react-dom";
import HTTP from "owp.http";
import HttpLoadingBar from "../index";
import "bootstrap/dist/css/bootstrap.min.css";

function doGet() {
    HTTP.get("https://api.github.com/rate_limit")
        .then(console.log)
        .catch(console.error);
}

const App = () => {
    const [className, setClassName] = useState();
    return (
        <>
            <HttpLoadingBar classNameInner={className} />
            <main className="container">
                <h1>owp.htttp-loading-bar</h1>

                <select
                    value={className}
                    onChange={e => setClassName(e.target.value)}
                >
                    <option value={null}>[No class selected]</option>
                    <option value="bg-success">bg-success</option>
                    <option value="bg-info">bg-info</option>
                    <option value="bg-warning">bg-warning</option>
                    <option value="bg-danger">bg-danger</option>
                </select>
                &nbsp;
                <button onClick={doGet}>
                    Try
                </button>
            </main>
        </>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);