import { defineConfig } from 'vite';
import reactJsx from 'vite-react-jsx'
import path from 'path';

const viteConfig = defineConfig({
    plugins: [
        reactJsx(),
    ],
    esbuild: {
        jsxInject: "import { createElement as h } from 'react'",
        jsxFactory: 'h'
    },
    resolve: {
        alias:{
            '@' : path.resolve(__dirname, './src'),
            '~' : path.resolve(__dirname, './src')
        },
    },
});
export default viteConfig;