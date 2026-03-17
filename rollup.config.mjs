import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/index.tsx',
	external: ['react'],
	plugins: [
		nodeResolve({
			extensions: ['.ts', '.tsx']
		}),
		typescript({
			tsconfig: './tsconfig.json',
			declaration: true,
			declarationDir: 'dist',
			emitDeclarationOnly: false
		}),
		terser()
	],
	output: [
		{
			file: 'dist/index.js',
			format: 'cjs',
			exports: 'default',
			sourcemap: true
		},
		{
			file: 'dist/index.mjs',
			format: 'es',
			sourcemap: true
		}
	]
};
