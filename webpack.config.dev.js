import webpack from 'webpack'
import path from 'path'

const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, "src");


export default {
  devtool: 'inline-source-map',

  entry: SRC_DIR + "/app/index.js",
  target: 'web',
  output: {
    path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] }
    ]
  }

}
