import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildPlugins({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
    console.log('DDD', __dirname);
    // console.log( 'DDD', path.resolve(__dirname, '..', '..','public','index.html'));
    const plugins = [
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
        }),
        // Plugin for hot module replacement
        // new webpack.HotModuleReplacementPlugin(),
    ];
    // for working hot module replacement with React components
    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin());
        // plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    return plugins;
}
