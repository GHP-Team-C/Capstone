const path = require('path')

module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
  },
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    historyApiFallback: true,
    allowedHosts: "all",
  },
  context: __dirname,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            [
              "import",
              {
                libraryName: "@mui/material",
                libraryDirectory: "",
                camel2DashComponentName: false,
              },
              "core",
            ],
            [
              "import",
              {
                libraryName: "@mui/icons-material",
                libraryDirectory: "",
                camel2DashComponentName: false,
              },
              "icons",
            ],
          ],
        },
      },
    ],
  },
};
