import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const dist = 'dist';

export default {
  input: 'src/index.ts',
  external: ['react'],
  output: 
  [
    {
      sourcemap: true,
      file: `${dist}/bundle.cjs.js`,
      format: 'commonjs'
    },
    {
      sourcemap: true,
      file: `${dist}/bundle.esm.js`,
      format: 'esm'
    },
    {
      sourcemap: true,
      name: 'ReactBrowserCam',
      file: `${dist}/bundle.umd.js`,
      globals: {
        react: 'React'
      },
      format: 'umd'
    }
  ],
  plugins: [resolve(), typescript({ tsconfig: './tsconfig.json', sourceMap: true}), terser(), postcss()]
};
