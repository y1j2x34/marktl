const plugins = require('./rollup.plugins');
const path = require('path');
module.exports = [{
    input:'test/browser/index.spec.ts',
    output: {
        file: path.join('./dist', 'index.js'),
        format: 'umd',
        name: 'marktl',
        sourcemap: true
    },
    plugins: [
        plugins.nodeResolve(),
        plugins.commonjs(),
        plugins.typescript(),
        plugins.uglify()
    ]
}];
