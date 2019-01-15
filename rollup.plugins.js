const typescript = require('rollup-plugin-typescript2');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const strip = require('rollup-plugin-strip');
const uglify = require('rollup-plugin-uglify');

function ext(opt1, opt2) {
    if(opt2 && opt1) {
        for(let key in opt2) {
            opt1[key] = opt2[key];
        }
    }
    return opt1;
}

module.exports = {
    strip(opt){
        return strip(ext({
            debugger: true,
            functions: ['console.*'],
            sourceMap: true
        }, opt));
    },
    typescript(opt){
        return typescript(ext({
            tsconfig: 'tsconfig.json',
            tsconfigOverride: {
                sourceMap: true,
                compilerOptions: {
                    module: "ES2015"
                }
            }
        }, opt));
    },
    nodeResolve(opt){
        return nodeResolve(ext({
            jsnext: true,
            main: true,
            module: true,
            browser: true,
            preferBuiltins: false
        }, opt));
    },
    commonjs(opt){
        return commonjs(ext({
            include: ['node_modules/**'],
            namedExports: {

            }
        }, opt));
    },
    uglify(opt) {
        return uglify.uglify(ext({}, opt));
    }
};
