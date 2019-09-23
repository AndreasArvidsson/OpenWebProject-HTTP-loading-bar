/**
 * @author Andreas Arvidsson
 * https://github.com/AndreasArvidsson/OpenWebProject-HTTP-loading-bar
 */
import "react-loading-bar/dist/index.css";
import React, { useState, useEffect } from "react";
import ReactLoadingBar from "react-loading-bar";
import HTTP from "owp.http";

let countStarted = 0;
let countFinished = 0;
let isLoading = false;
let intervalId;

const HTTPLoadingBar = ({ color = "green", ...rest }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        HTTP.setOnStateChange(readyState => {
            switch (readyState) {
                case 1:
                    ++countStarted;
                    if (!isLoading) {
                        startLoadingBar();
                    }
                    break;
                case 4:
                    ++countFinished;
                    if (countFinished >= countStarted) {
                        stopLoadingBar();
                    }
            }
        });
    }, []);

    const startLoadingBar = () => {
        isLoading = true;
        progressLoadingBar();
        intervalId = setInterval(progressLoadingBar, 100);
    }

    const progressLoadingBar = () => {
        if (isLoading) {
            setShow(true);
        }
    }

    const stopLoadingBar = () => {
        isLoading = false;
        clearInterval(intervalId);
        setShow(false);
    }

    //return <ReactLoadingBar show={show} {...props} />
    return React.createElement(ReactLoadingBar, { show, color, ...rest }, null);
}
export default React.memo(HTTPLoadingBar);