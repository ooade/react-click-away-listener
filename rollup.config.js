import fs from 'fs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const pkg = JSON.parse(
	fs.readFileSync('./package.json', { encoding: 'utf-8' })
);
const extensions = ['.ts', '.tsx'];

export default {
	input: 'src/index.tsx',
	external: ['react'],
	plugins: [
		typescript(),
		babel({
			extensions,
			babelHelpers: 'bundled',
			exclude: 'node_modules/**'
		}),
		terser()
	],
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			sourcemap: true
		},
		{
			file: pkg.module,
			format: 'es',
			sourcemap: true
		},
		{
			name: 'react-click-away-listener',
			file: pkg.umd,
			format: 'umd',
			sourcemap: true,
			globals: {
				react: 'react'
			}
		}
	]
};
