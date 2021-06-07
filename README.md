# OpenWebProject HTTP-loading-bar

**React/Bootstrap loading bar for owp.http**

## Try it
https://andreasarvidsson.github.io/OpenWebProject-HTTP-loading-bar/

## Installation
```
npm install owp.http-loading-bar --save

//Peer dependencies
npm install owp.http --save
```

## Usage
Import loading-bar before creating any instanced of owp.http.
```javascript
import LoadingBar from "owp.http-loading-bar"

<LoadingBar />
```


## Options
```javascript
<LoadingBar 
    className="sticky-top"
    classNameInner="progress-bar-striped sticky-top" 
/>;
```

* className: Set additional classes to the outer `progress` div
* className: Set additional classes to the inner `progress-bar` div