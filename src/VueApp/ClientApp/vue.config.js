
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    devServer: {
        progress: true,
        public: "localhost:44367"
    },
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    { from: "node_modules/oidc-client/dist/oidc-client.min.js", to: "js" }
                ]
            })
        ]
    }
}