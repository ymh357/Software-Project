const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.join(__dirname, '/dist'),
        publicPath: '/'
    },
    module: {

        
        rules: [

            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /^(?!.*?\.module).*\.css$/,
                use: ['style-loader', 'css-loader']
              },
              {
                test: /\.module\.css$/,
                use: ['style-loader', {
                  loader: 'css-loader',
                  options: {
                    modules: true
                  }
                }]
              }


        ]
    },
    devServer: {
        host: '0.0.0.0',
        historyApiFallback: true,
        proxy: {
        '/api/*':{
            target: 'http://ec2-52-68-78-115.ap-northeast-1.compute.amazonaws.com:5000',
            changeOrigin: true,
            secure: false
        }

        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),

    ]
}