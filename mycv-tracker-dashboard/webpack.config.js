const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require("path");

module.exports = (
  env,
  argv
) => {
  console.log(env);
  let envMode = env.project;
  let envPath = "./.env." + envMode;
  console.log("evn ", envPath);

  return {
    resolve : {
      extensions : [
        ".tsx",
        ".js"
      ]
    },
    output : {
      path : path.resolve(__dirname, "dist"),
      // Generated JS file names (with nested folders).
      // There will be one main bundle, and one file per asynchronous chunk.
      // We don't currently advertise code splitting but Webpack supports it.
      filename : "assets/shn/js/[name].[fullhash].js",
      chunkFilename : "assets/shn/js/[name].[fullhash].chunk.js",
      // We inferred the "public path" (such as / or /my-project) from homepage.
      publicPath : "/"
    },
    plugins : [
      new HtmlWebpackPlugin(
        {
          template : path.resolve(__dirname, "src", "index.html"),
          favicon : path.resolve(__dirname, "src", "favicon.ico")
        }
      ),
      new MiniCssExtractPlugin({
        filename : "assets/shn/css/[name].[fullhash].css",
        chunkFilename : "assets/shn/css/[id].[fullhash].css"
      }),
      new CopyWebpackPlugin({
        patterns : [
          {
            from : "src/assets/images",
            to : "assets/shn/images"
          }
        ]
      }),
      new Dotenv({
        path : envPath
      })
    ],
    module : {
      rules : [
        {
          test : /\.(js|jsx|tsx|ts)$/,
          exclude : /node_modules/,
          use : ["babel-loader"]
        },
        {
          test : /\.(sa|sc|c)ss$/,
          use : [
            {
              loader : MiniCssExtractPlugin.loader
            },
            {
              loader : "css-loader",
              options : {
                url : false
              }
            },
            {
              loader : "sass-loader"
            }
          ]
        }
      ]
    },
    optimization : {
      splitChunks : {
        chunks : "all"
      },
      minimizer : [
        new UglifyJsPlugin({
          test : /\.(js|jsx|tsx|ts)$/,
          exclude : /node_modules/,
          uglifyOptions : {
            comments: false,
            compress : {
              drop_console : true
            },
          }
        }),
      ]
    },
    devServer : {
      static : "./src/index.js",
      historyApiFallback : true,
      port : 3115
    }
  };
};
