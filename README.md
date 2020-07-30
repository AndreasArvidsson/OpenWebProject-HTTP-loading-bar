# OpenWebProject HTTP-loading-bar

**React loading bar for owp.http**

Uses [react.loading-bar](https://www.npmjs.com/package/react-loading-bar) to signal usage/progress of [owp.http](https://github.com/AndreasArvidsson/OpenWebProject-HTTP)

## Try it
https://andreasarvidsson.github.io/OpenWebProject-HTTP-loading-bar/

## Installation
```
npm install owp.http-loading-bar --save

//Peer dependencies
npm install owp.http --save
npm install react --save
npm install react-loading-bar --save
```

## Usage
```javascript
import LoadingBar from "owp.http-loading-bar"

<LoadingBar />
```


## Options
All options from [react.loading-bar](https://www.npmjs.com/package/react-loading-bar) are available.

```javascript
<LoadingBar
    show={true}
    color="red"
    change={false}
    showSpinner={true}
/>
```
