import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  external: Object.keys(pkg.peerDependencies || {}),
  output: [
    {
      sourcemap: true,
      file: pkg.main,
      format: 'commonjs'
    },
    {
      sourcemap: true,
      file: pkg.module,
      format: 'esm'
    },
  ],
  plugins: [
    postcss(),
    resolve(),
    typescript({
      typescript: require('typescript')
    }),
    terser()
  ]
};
