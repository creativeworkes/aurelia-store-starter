const { AureliaPlugin } = require('aurelia-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const { resolve } = require('path');

const srcDir = resolve(__dirname, 'src');
const distDir = resolve(__dirname, 'dist');
const nodeModulesDir = resolve(__dirname, 'node_modules');

module.exports = function ({production, server, coverage}) {
  return {
    mode: production || 'development',
    resolve: {
      extensions: ['.js'],
      modules: [
        srcDir, nodeModulesDir
      ]
    },
    entry: {
      // the 'aurelia-bootstrapper' entry point is responsible for resolving your app code
      app: ['aurelia-bootstrapper']
    },
    output: {
      filename: '[name].js',
      path: distDir
    },
    watch: production,
    devtool: production ? 'nosources-source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: './dist'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('precss'), require('autoprefixer')]
              }
            },
            { loader: 'sass-loader' }
          ],
          issuer: /\.[tj]s$/i
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('precss'), require('autoprefixer')]
              }
            },
            { loader: 'sass-loader' }
          ],
          issuer: /\.html?$/i
        },
        { test: /\.html$/i, loader: 'html-loader' },
        { test: /\.js$/i, loader: 'babel-loader', exclude: nodeModulesDir,
          options: coverage ? { sourceMap: 'inline', plugins: [ 'istanbul' ] } : {},
        },
        { test: /\.json$/i, loader: 'json-loader' },
        // use Bluebird as the global Promise implementation:
        { test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/, loader: 'expose-loader?Promise' }
      ]
    },
    plugins: [
      // the AureliaPlugin translates Aurelia's conventions to something Webpack understands
      // and must be included in order for Webpack to work
      new AureliaPlugin(),
      // define global object given by user or commond line
      new DefinePlugin({
        GLOBAL_ENV: JSON.stringify({
          production: production ? 'production' : 'development'
        })
      }),
      new HtmlWebpackPlugin({
        template: 'index.ejs',
        hash: production ? true : false,
        metadata: {
          title: 'Aurelia Store Start',
          server
        }
      })
    ]
  };
};
