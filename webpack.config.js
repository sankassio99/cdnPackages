const path = require("path")

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.dev.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            }
        ]
    }
}