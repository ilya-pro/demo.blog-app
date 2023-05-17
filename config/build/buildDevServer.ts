import {BuildOptions} from "./types/config";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        open: true,
        // for redirect working after reload page on some, like /about
        historyApiFallback: true,
        // scss reloaded without it option, but react component needed it
        hot: true
    }
}
