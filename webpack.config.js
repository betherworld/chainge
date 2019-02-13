const path = require("path");
const ChildProcess = require("child_process");

const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

const VERSION = ChildProcess.execSync("git rev-parse HEAD")
  .toString()
  .trim();

process.traceDeprecation = true; //https://github.com/webpack/loader-utils/issues/56

const context = __dirname;

module.exports = {
  mode: "development",

  context,

  entry: [
    "react-hot-loader/patch",
    /*"webpack-hot-middleware/client",*/
    path.join(context, "src/index.jsx")
  ],

  output: {
    path: path.join(context, "build/"),
    filename: "bundle.js",
    publicPath: "/"
  },

  devtool: "inline-source-map",
  devServer: {
    contentBase: ".",
    hot: true,
    historyApiFallback: true
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({
      path: "./.env", // Path to .env file (this is the default)
      safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
      systemvars: true
    }),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: "Chainge",
      template: "index.ejs",
      version: VERSION
    })
  ],

  resolve: {
    modules: [
      path.resolve(context, "src"),
      path.resolve(context, "node_modules")
    ],
    extensions: [".js", ".jsx", ".css", ".scss"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(context, "src")],

        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    targets: {
                      browsers: ["> 1%", "last 2 major versions", "IE 10"]
                    }
                  }
                ],
                "@babel/preset-react"
              ],
              plugins: [
                "babel-plugin-styled-components",
                ["@babel/plugin-proposal-class-properties", { loose: false }],
                "@babel/plugin-proposal-object-rest-spread",
                "react-hot-loader/babel"
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(context, "src"),
          path.resolve(context, "node_modules")
        ],

        use: [
          "style-loader",
          { loader: "css-loader", options: { import: false, sourceMap: true } },
          { loader: "postcss-loader", options: { sourceMap: true } }
        ]
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(context, "src"),
          path.resolve(context, "node_modules")
        ],

        use: [
          "style-loader",
          { loader: "css-loader", options: { import: false, sourceMap: true } },
          { loader: "postcss-loader", options: { sourceMap: true } },
          "resolve-url-loader",
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(woff2?|png|jp(e*)g|svg)$/,
        loader: "file-loader"
      }
    ]
  }
};
