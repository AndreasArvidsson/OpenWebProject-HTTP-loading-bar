/**
 * @author Andreas Arvidsson
 * https://github.com/AndreasArvidsson/OpenWebProject-HTTP-loading-bar
 */
import { useState, useEffect } from "react";
import HTTP from "owp.http";

let stateChangeInterceptor, progressInterceptor;

HTTP.useOptions({
    stateChangeInterceptor: (readyState) => {
        if (stateChangeInterceptor != null) {
            stateChangeInterceptor(readyState);
        }
    },
    progressInterceptor: (loaded, total) => {
        if (progressInterceptor != null) {
            progressInterceptor(loaded, total);
        }
    },
});

let percentage, countStarted, countFinished, intervalId;

const HTTPLoadingBar = ({ className, classNameInner }) => {
    const [now, setNow] = useState(0);

    useEffect(() => {
        percentage = 0;
        countStarted = 0;
        countFinished = 0;

        stateChangeInterceptor = (readyState) => {
            switch (readyState) {
                case XMLHttpRequest.OPENED:
                    ++countStarted;
                    break;
                case XMLHttpRequest.DONE:
                    ++countFinished;

                    if (countFinished >= countStarted) {
                        stopLoadingBar();
                    }
            }
        };

        progressInterceptor = (loaded, total) => {
            // If we have a total calculate actual percentage
            if (total > 0) {
                const newPercentage = Math.round(100 * (loaded / total));
                // In case of multiple parallel requests: never backtrack progress.
                if (newPercentage > percentage) {
                    setPercentage(newPercentage);
                }
            }
            // Without a total we just advanced the loading bar incrementally
            else if (percentage === 0) {
                advanceLoadingBar();
                intervalId = setInterval(advanceLoadingBar, 100);
            }
        };

        return () => {
            stateChangeInterceptor = null;
            progressInterceptor = null;
        };
    }, []);

    const setPercentage = (value) => {
        if (percentage !== value) {
            percentage = value;
            setNow(value);
        }
    };

    const advanceLoadingBar = () => {
        if (countStarted > countFinished) {
            // Increment is proportional to how far we are from 100. Takes about a second to fill up.
            const increment = Math.ceil((100 - percentage) * 0.2);
            // Update and clamp
            setPercentage(Math.min(percentage + increment, 98));
        }
    };

    const stopLoadingBar = () => {
        setPercentage(100);

        setTimeout(() => {
            if (countFinished >= countStarted) {
                clearInterval(intervalId);
                countStarted = 0;
                countFinished = 0;
                setPercentage(0);
            }
        }, 100);
    };

    return (
        <div className={"progress" + (className ? " " + className : "")}>
            <div
                className={
                    "progress-bar" +
                    (classNameInner ? " " + classNameInner : "")
                }
                role="progressbar"
                style={{ width: now + "%" }}
                aria-valuenow={now}
                aria-valuemin="0"
                aria-valuemax="100"
            />
        </div>
    );
};

export default HTTPLoadingBar;
