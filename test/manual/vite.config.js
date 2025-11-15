import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
	root: path.resolve(import.meta.dirname),
	build: {
		emptyOutDir: true,
		outDir: path.resolve(process.cwd(), 'test-dist'),
		rolldownOptions: {
			transform: {
				target: ['chrome100', 'firefox100', 'edge100', 'ios13.3', 'opera100', 'safari13.1']
			}
		}
	},
	css: {
		lightningcss: {
			targets: {
				'chrome': 6_553_600,
				'firefox': 6_553_600,
				'android': 9_306_112,
				'edge': 6_553_600,
				'ios_saf': 852_736,
				'opera': 6_553_600,
				'safari': 852_224,
				'samsung': 721_152
			}
		}
	}
});
