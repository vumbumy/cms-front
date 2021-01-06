module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/cms-web-ui/' : '/',
    outputDir: 'docs',
    configureWebpack: {
        output: {
            filename: "js/[name].js",
            chunkFilename: "js/[name].js"
        }
    },
    chainWebpack: config => {
        if (config.plugins.has("extract-css")) {
            const extractCSSPlugin = config.plugin("extract-css");
            extractCSSPlugin &&
            extractCSSPlugin.tap(() => [
                {
                    filename: "css/[name].css",
                    chunkFilename: "css/[name].css"
                }
            ]);
        }

        // config.plugins
        //     .delete("html")
        //     .delete("prefetch")
        //     .delete("preload");
    },
    css: {
        loaderOptions: {
            // pass options to sass-loader
            // @/ is an alias to src/
            // so this assumes you have a file named `src/variables.scss`
            // Note: this option is named as "prependData" in sass-loader v8
            sass: {
                additionalData: `@import "~@/styles/variables.scss";`
            },
            // by default the `sass` option will apply to both syntaxes
            // because `scss` syntax is also processed by sass-loader underlyingly
            // but when configuring the `prependData` option
            // `scss` syntax requires an semicolon at the end of a statement, while `sass` syntax requires none
            // in that case, we can target the `scss` syntax separately using the `scss` option
            scss: {
                additionalData: `@import "~@/styles/variables.scss";`
            },
            // pass Less.js Options to less-loader
            // less:{
            //     // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
            //     // `primary` is global variables fields name
            //     globalVars: {
            //         primary: '#fff'
            //     }
            // }
        }
    }
}
