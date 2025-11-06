import path from 'node:path';
import { deleteAsync } from 'del';
import { globby } from 'globby';
import minimist from 'minimist';
import staticSite from 'rollup-plugin-static-site';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import atImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';

const arguments_ = minimist(process.argv.slice(2), {
	'default': {
		watch: false
	}
});

const config = async () => {
	let server;

	if (arguments_.watch) {
		const port = 0;
		server = serve({
			contentBase: 'test-dist',
			port: port,
			open: true
		});
	}

	await deleteAsync(['./test-dist']);

	const files = await globby(['./test/manual/**/*.js', '!./test/manual/rollup.config.js']);

	const entries = files
		.map((file) => {
			const extname = path.extname(file);
			const key = path.basename(file, extname);
			const object = {};
			object[`${file.replace('./test/manual/', '').replace(path.basename(file), '')}${key}`] =
				file;
			return object;
		})
		.reduce((previous, next) => {
			return Object.assign(previous, next);
		}, {});

	return Object.keys(entries).map((key) => ({
		input: entries[key],
		output: {
			file: `test-dist/${key}.js`,
			format: 'iife',
			name: 'styleFileInput',
			sourcemap: 'inline'
		},
		plugins: [
			resolve({
				browser: true,
				preferBuiltins: true
			}),
			commonjs(),
			babel({
				exclude: 'node_modules/**',
				babelHelpers: 'runtime'
			}),
			postcss({
				extract: true,
				sourceMap: 'inline',
				plugins: [atImport(), postcssPresetEnv()],
				bundle: `${key}.css`
			}),
			staticSite({
				dir: 'test-dist',
				title: key,
				filename: `${key}.html`,
				css: `test-dist/${key}.css`,
				template: {
					path: `./test/manual/${key}.html`
				}
			}),
			arguments_.watch && server
		]
	}));
};

export default config();
