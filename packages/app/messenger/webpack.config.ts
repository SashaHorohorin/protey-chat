import path from 'path';
import webpack from 'webpack';
import {buildWebpack} from "./webpack/buildWebpack";
import {BuildMode, BuildPath, BuildPlatform} from "./webpack/types/types";
import packageJson from "./package.json";


interface EnvVariables {
    mode?: BuildMode;
    port?: number;
    analyzer?: boolean;
    platform?: BuildPlatform;
    CHAT_REMOTE_URL?: string;
}
export default (env: EnvVariables) => {

    const paths: BuildPath = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src')
    }

    const CHAT_REMOTE_URL = env.CHAT_REMOTE_URL ?? 'http://localhost:3001';

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop'
    });

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'messenger',
        remotes: {
            chat: `chat@${CHAT_REMOTE_URL}/remoteEntry.js`
        },
        shared: {
            mobx: { singleton: true },
            ...packageJson.dependencies,
            react: {
                eager: true,
                requiredVersion: packageJson.dependencies['react']
            },
            'react-router-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-router-dom']
            },
            'react-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-dom']

            }
        }
    }))

    return config;
}