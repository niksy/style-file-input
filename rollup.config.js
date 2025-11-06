import path from 'node:path';
import { promises as fs } from 'node:fs';
import babel from '@rollup/plugin-babel';
import { execa } from 'execa';
import cpy from 'cpy';

export default {
	input: 'index.js',
	output: [
		{
			file: 'dist/index.js',
			format: 'esm',
			sourcemap: true
		}
	],
	plugins: [
		(() => {
			return {
				name: 'types',
				async writeBundle(output) {
					let pkgDir;
					if (output.file.includes('dist/')) {
						pkgDir = 'dist';
					}
					if (typeof pkgDir !== 'undefined') {
						const { stdout } = await execa(
							'tsc',
							['-p', './tsconfig.build.json', '--declarationDir', pkgDir],
							{
								preferLocal: true
							}
						);
						try {
							await cpy('types', `${pkgDir}/types`);
						} catch (error) {}
						console.log(stdout);
					}
				}
			};
		})(),
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**'
		})
	]
};
