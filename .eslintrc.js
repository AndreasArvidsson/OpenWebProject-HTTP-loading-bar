module.exports = {
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parser: "babel-eslint",
    env: {
        browser: true, //window
        amd: true, //require
        node: true, //module
        es6: true, //Promise
    },
    rules: {
        "no-console": "off",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off", //Allow jsx without React var in scope
        "react/jsx-uses-react": "off", //Throw error for unused React var in scope
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    ignorePatterns: ["docs"],
};
