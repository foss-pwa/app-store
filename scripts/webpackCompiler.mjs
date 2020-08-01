import webpack from "webpack";
import { join } from "path";
import { srcFolder } from "../paths.mjs";
import { buildFolder } from "../paths.mjs";

const config = {
  entry: {
    bundle: join(srcFolder, 'react', 'index.js'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: join(buildFolder, 'dist'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

export const productionCompiler = webpack({
  ...config,
  mode: 'production',
});

export const developmentCompiler = webpack({
  ...config,
  mode: 'development',
});
