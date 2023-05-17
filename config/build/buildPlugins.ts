import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
//import path from "path";
import webpack from "webpack";
import {BuildOptions} from "./types/config";

export function buildPlugins({paths, isDev}: BuildOptions): webpack.WebpackPluginInstance[] {
    console.log( 'DDD', __dirname);
    //console.log( 'DDD', path.resolve(__dirname, '..', '..','public','index.html'));
    return [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/ch-[id].css',
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: isDev,
        })
    ]
}
