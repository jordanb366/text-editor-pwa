const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// Completed: Added and configure workbox plugins for a service worker and manifest file.
// Completed: Added CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    // The entry point for the files once verything is bundled
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      // Output path and file name(s)
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Web pack plugging for HTML template and the title
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Text Editor",
      }),
      // Injects the custom service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // Creates a manifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Text Editor",
        short_name: "text_editor",
        description: "Awesome Text editor",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      // The CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // Uses babel-loader
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
