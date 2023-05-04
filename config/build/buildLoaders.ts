import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };
    const fileLoader = {
        //test: /\.(png|jpe?g|gif|woff2|woff)$/i, // for fonts
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
    }
    const scssLoader = {
        test: /\.s[ac]ss$/i,
            use: [
                // ! Order in this array applies from end to the start

                // Creates `style` nodes from JS strings
                //"style-loader",
                // MiniCssExtractPlugin make css-file per module
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    //loader: ,
                // Translates CSS into CommonJS
                {
                    loader: 'css-loader',
                    options: {
                        //modules: true,
                        modules: {
                            // also can be done with regex
                            auto: (resPath: string) => Boolean(resPath.includes('.module.scss')),
                            localIdentName: isDev ? '[path][name]__[local].css' : '[hash:base64:8]',
                        }
                    }
                },

                // Compiles Sass to CSS
                "sass-loader",
            ],
    };

    // TS лоадер уже умеет обрабатывать JSX, поэтому babel не требуется
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    return [
        svgLoader,
        fileLoader,
        scssLoader,
        typescriptLoader,
    ]
}
