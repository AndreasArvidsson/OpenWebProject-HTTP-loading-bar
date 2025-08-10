console.log("test.js");

import { useState } from "react";
import { createRoot } from "react-dom/client";
import HTTP from "owp.http";
import HttpLoadingBar from "../index.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function doGet() {
    // const url = "https://api.github.com/rate_limit";
    const url =
        "https://raw.githubusercontent.com/json-iterator/test-data/refs/heads/master/large-file.json?t=" +
        Date.now();

    HTTP.get(url)
        .then(() => {
            console.log("Done");
        })
        .catch(console.error);
}

const App = () => {
    const [className, setClassName] = useState();
    return (
        <>
            <HttpLoadingBar classNameInner={className} />
            <main className="container">
                <h1>owp.htttp-loading-bar</h1>

                <div className="row">
                    <div className="col">
                        <select
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            className="form-select"
                        >
                            <option value={null}>[No class selected]</option>
                            <option value="bg-success">bg-success</option>
                            <option value="bg-info">bg-info</option>
                            <option value="bg-warning">bg-warning</option>
                            <option value="bg-danger">bg-danger</option>
                        </select>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary" onClick={doGet}>
                            Try
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
