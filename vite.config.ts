import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		port: process.env.NODE_ENV === 'development' ? 5173 : 8080,
		host: true,
	}
};

export default config;