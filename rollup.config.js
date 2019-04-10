import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

let pkg = require('./package.json');

export default {
	input: 'src/index.js',
	external: ['react', 'prop-types'],
	plugins: [
		babel({
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
				react: 'react',
				'prop-types': 'prop-types'
			}
		}
	]
};
