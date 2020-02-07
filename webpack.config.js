const webpack = require("webpack");
const path = require("path");
const debug = require("debug");

const BUILD_DIR = path.resolve(__dirname, "src/public");
const APP_DIR = path.resolve(__dirname, "src/app");
const SCSS_DIR = path.resolve(__dirname, "src/scss");
const SRC = path.resolve(__dirname, "src");

var config = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : false,
  entry: APP_DIR + "/index.jsx",
  watch: true,
  output: {
    path: BUILD_DIR,
    filename: "client.min.js"
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i, //to support eg. background-image property
        loader: "file-loader",
        query: {
          name: "[path][name].[ext]",
          outputPath: "../"
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, //to support @font-face rule
        loader: "url-loader",
        query: {
          limit: "10000",
          name: "[path][name].[ext]",
          outputPath: "../"
        }
      },
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-react", "@babel/preset-env"],
          plugins: [
            "react-html-attrs",
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }]
          ]
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devServer: {
    host: "localhost", // Defaults to `localhost`
    port: 3000, // Defaults to 8080,
    proxy: {
      "^/api/*": {
        target: "http://localhost:3000/",
        secure: false
      }
    }
  },

  plugins: debug
    ? []
    : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
      ]
};

module.exports = config;
