const path = require('path');

module.exports = () => { return {
    entry: {
        'polyfills': './entries/polyfills.js',
        'shims': './entries/shims.js',
    },
    stats: {
        children: false,
        modules: false,
        entrypoints: false,
        hash: false,
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        library: 'polyshim',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    }
                ]
            }
        ]
    },
}};