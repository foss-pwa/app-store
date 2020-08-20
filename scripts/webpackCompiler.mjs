import webpack from "webpack";
import { join } from "path";
import { srcFolder } from "../paths.mjs";
import { buildFolder } from "../paths.mjs";

const config = (mode) => ({
  mode,
  entry: {
    bundle: join(srcFolder, 'react', 'index.js'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-react",
            ],
            plugins: [
              ...(mode === 'production' ? [] : ["@babel/plugin-transform-react-jsx-source"]),
            ],
          },
        }],
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: { modules: true },
          },
        ],
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
});

export const productionCompiler = webpack(config('production'));

export const developmentCompiler = webpack(config('development'));
