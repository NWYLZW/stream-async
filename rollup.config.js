import * as path from 'path'
import { RollupOptions } from 'rollup'

import merge from 'lodash.merge'

import { terser } from 'rollup-plugin-terser'
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
    typescript({
      tsconfig: 'tsconfig.json'
    })
  ]
}

export default merge(options, jobs[process.env.FORMAT || 'esm'])
