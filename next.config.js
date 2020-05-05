const withStyles = require('@webdeb/next-styles');
const path = require('path');

// SASS
module.exports = withStyles({
    sass: true, // use .scss files
    modules: true, // style.(m|module).css & style.(m|module).scss for module files
    sassLoaderOptions: {
        sassOptions: {
            // @import 'variables'; # loads (src/styles/varialbes.scss), you got it..
            includePaths: ['node_modules', 'src/styles'],
        },
    },
    // cssLoaderOptions: {},
    // postcssLoaderOptions: {...},
    ignoreOrder: true, // for https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250#issuecomment-544898772
    // miniCssExtractOptions: {
    //     filename: isDevMode() ? '[name].css' : '[name].[hash].css',
    //     chunkFilename: isDevMode() ? '[id].css' : '[id].[hash].css',
    // },

    webpack: (config, {dev, isServer}) => {
        if (dev) {
            // config.module.rules.push({
            //     enforce: 'pre',
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'eslint-loader',
            //     options: {
            //         // eslint options (if necessary)
            //     },
            // });

            if (!isServer) {
                const {I18NextHMRPlugin} = require('i18next-hmr/plugin');
                config.plugins.push(
                    new I18NextHMRPlugin({
                        localesDir: path.resolve(__dirname, 'public/static/locales'),
                    })
                );
            }
        }

        return config;
    },

});
