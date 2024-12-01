import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            runtime: 'edge' // or 'nodejs18' or 'nodejs20'
        })
    },
    preprocess: vitePreprocess()
};

export default config;
