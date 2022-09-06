const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

const fs = require( 'fs' );
const pages = fs.readdirSync( './src/pages' );

let htmlPages = [];
pages.forEach( page => {
  if ( page.endsWith( '.pug' ) ) {
    htmlPages.push( page.split( '.pug' )[0] )
  }
})

let multipleHtmlPlugins = htmlPages.map( name => {
  let chunk = [ 'main' ];
  return new HtmlWebpackPlugin({
    template: `${PATHS.src}/pages/${name}.pug`,
    filename: `${name}.html`,
    chunks: chunk,
    scriptLoading: 'blocking', // Scripts from head to bottom
    minify: {
      collapseWhitespace: false
    }
  })
});

module.exports = {
  context: PATHS.src,
  entry: {
    main: `${PATHS.src}/index.js`
  },
  output: {
    path: PATHS.dist,
    filename: 'js/[name].js',
  },
  cache: {
    type: 'filesystem',
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    watchFiles: [
      `${PATHS.src}/pages/*.pug`,
      `${PATHS.src}/pages/includes/**/*.pug`,
      `${PATHS.src}/sass/**/*.sass`,
      `${PATHS.src}/js/**/*.js`,
    ]
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug3-loader',
            options: {
              pretty: true,
            }
          },
        ],
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.(s*)[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader', // Befor sass-loader
          }, {
            loader: 'sass-loader', // Sfter postcss-loader
          }
        ]
      }, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: '[path][name].[ext]',
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: `${PATHS.src}/images`,
          to: 'images'
        }
      ]
    })
  ].concat( multipleHtmlPlugins )
}
