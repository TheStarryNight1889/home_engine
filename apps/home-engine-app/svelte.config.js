import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: sveltePreprocess({
		scss: {
			prependData: `@import '${join(__dirname, 'src/styles/app.scss').replace(/\\/g, '/')}';`
		}
	})
};

export default config;
