const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => {

    console.log("----------------------------")
    console.log(" ", argv.mode);
    console.log("----------------------------\n")

    const res = {
        entry: path.resolve(__dirname, "demo/test.js"),
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    ["@babel/preset-react", {
                                        //Replaces the import source when importing functions.
                                        //Remove for @babel/core 8
                                        runtime: "automatic"
                                    }]
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: path.resolve(__dirname, "demo/index.html")
            }),
            //Extract css styles as external file.
            new MiniCssExtractPlugin({
                filename: "styles.css"
            }),
            //Lint JS files
            new ESLintPlugin({
                overrideConfigFile: path.resolve(__dirname, "eslintrc.js")
            })
        ]
    };

    if (argv.mode === "production") {
        res.output = {
            path: path.resolve(__dirname, "docs"),
            filename: "index.js"
        };
    }

    return res;
};