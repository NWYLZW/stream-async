import * as path from 'path'
import { RollupOptions } from 'rollup'

import merge from 'lodash.merge'

import { terser } from 'rollup-plugin-terser'
import eslint from '@rollup/plugin-eslint'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

import pkg from './package.json'

const resolve = (...args) => {
  return path.resolve(__dirname, ...args)
}

const jobs = {
  esm: {
    output: {
      format: 'esm',
      file: resolve(pkg.module)
    }
  },
  umd: {
    output: {
      format: 'umd',
      file: resolve(pkg.main)
    }
  },
  min: {
    output: {
      format: 'umd',
      file: resolve(pkg.main.replace(/(.\w+)$/, '.min$1'))
    },
    plugins: [ terser() ]
  }
}

/** @type { import('rollup').RollupOptions } */
const options = {
  input: 'src/index.ts',
  output: { name: pkg.name },
  plugins: [
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: [ 'src/**/*.ts' ],
      exclude: [ 'node_modules/**', 'lib/**', '*.js' ],
    }),
    typescript({
      module: 'esnext',
      tsconfig: 'tsconfig.json'
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: [ 'ts', 'tsx' ],
    })
  ]
}

export default merge(options, jobs[process.env.FORMAT || 'esm'])
