const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const sortCSSmq = require('sort-css-media-queries');

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
    filename: 'js/[name].js?v=[hash]',
  },
  devtool: 'source-map',
  optimization: {
    chunkIds: 'named',
    minimize: true
  },
  devServer: {
    watchFiles: {
      paths: [PATHS.src]
    }
  },
  module: {
    rules: [
      { // Pug Loader
        test: /\.pug$/,
        exclude: /node_modules/,
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
            options: {
              postcssOptions: {
                plugins: [
                  'autoprefixer',
                  ['css-mqpacker', {
                    sort: sortCSSmq
                  }]
                ]
              }
            }
          }, {
            loader: 'sass-loader', // After postcss-loader
            options: {
              sassOptions: {
                outputStyle: 'expanded' // nested, expanded, compact, compressed
              }
            }
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
    new CleanWebpackPlugin(), // Clean dist
    new MiniCssExtractPlugin({
      filename: 'css/[name].css?v=[hash]',
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
