import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {buildDevServer} from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions, BuildPath} from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {

    const {mode, paths, port} = options;
    const isDev = mode === 'development';

    return {
        mode: mode ?? 'development',
        // путь до входного файла
        entry: paths.entry,
        // то куда происходит сборка, так же используем шаблоны, чтобы избежать ошибок в браузере
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true
        },
        // HtmlPlugin подставляет скрипты в нашу html в результате сборки
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
        devServer: isDev ? buildDevServer(options) : undefined
    };
}
//inline-source-map