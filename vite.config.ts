import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import vitePluginYaml from '@modyfi/vite-plugin-yaml';

export default defineConfig({
	plugins: [sveltekit(), vitePluginYaml()]
});
