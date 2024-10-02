import { build } from 'esbuild'
import { GasPlugin } from 'esbuild-gas-plugin'

build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/bundle.js',
    plugins: [GasPlugin],
})