/**
 * @author Andreas Arvidsson
 * https://github.com/AndreasArvidsson/OpenWebProject-HTTP-loading-bar
 */
import { useState, useEffect, useRef } from "react";
import HTTP from "owp.http";

let interceptor;

HTTP.useOptions({
    stateChangeInterceptor: (readyState) => {
        if (interceptor) {
            interceptor(readyState);
        }
    }
});

let countStarted, countFinished, intervalId;

const HTTPLoadingBar = ({ className, classNameInner }) => {
    const [now, setNow] = useState(0);
    const countRef = useRef(now);
    countRef.current = now;

    useEffect(() => {
        countStarted = 0;
        countFinished = 0;

        interceptor = (readyState) => {
            switch (readyState) {
                case XMLHttpRequest.OPENED:
                    ++countStarted;
                    if (!countRef.current) {
                        startLoadingBar();
                    }
                    break;
                case XMLHttpRequest.DONE:
                    ++countFinished;
                    if (countFinished >= countStarted) {
                        stopLoadingBar();
                    }
            }
        };
        return () => {
            interceptor = null;
        };
    }, []);

    const startLoadingBar = () => {
        progressLoadingBar();
        intervalId = setInterval(progressLoadingBar, 100);
    };

    const progressLoadingBar = () => {
        if (countStarted > countFinished && countRef.current < 99) {
            setNow(calculatePercent(countRef.current));
        }
        else {
            clearInterval(intervalId);
        }
    };

    const stopLoadingBar = () => {
        clearInterval(intervalId);
        setNow(100);
        setTimeout(() => {
            if (countFinished >= countStarted) {
                countStarted = 0;
                countFinished = 0
                setNow(0);
            }
        }, 500);
    };

    return (
        <div className={"progress" + (className ? " " + className : "")}>
            <div
                className={"progress-bar" + (classNameInner ? " " + classNameInner : "")}
                role="progressbar"
                style={{ width: now + "%" }}
                aria-valuenow={now}
                aria-valuemin="0"
                aria-valuemax="100" />
        </div>
    );
}

export default HTTPLoadingBar;

const calculatePercent = (percent) => {
    let random = 0;
    if (percent < 10) {
        random = 10; // 10
    }
    else if (percent < 25) {
        random = Math.random() * 4 + 4; // 4 - 8
    }
    else if (percent < 65) {
        random = Math.random() * 2 + 3; // 3 - 5
    }
    else if (percent < 90) {
        random = Math.random() + 2; // 2 - 3
    }
    else if (percent < 99) { // 1
        random = 1;
    }
    else {
        random = 0; // 0
    }
    return percent + Math.round(random * 0.75);
};