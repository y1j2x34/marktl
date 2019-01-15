var rollupPlugins = require('./rollup.plugins');
var rollupIstanbul = require('rollup-plugin-istanbul');

module.exports = function(config) {
    config.set({
        basePath: process.cwd(),

        frameworks: ['mocha'],

        restartBrowserBetweenTests: true,

        // browserDiconnectTimeout: 4000,
        // browserNoActivityTimeout: 4000,

        files: [
            'test/browser/*.spec.ts',
            {
                pattern: 'src/**/*.ts',
                served: true,
                included: false,
                watched: true
            },
            {
                pattern: 'test/foundation/**/*.ts',
                served: true,
                included: false,
                watched: true
            }
        ],

        mime: {
            'text/x-javascript': ['ts']
        },

        preprocessors: {
            'test/browser/index.spec.ts': ['rollup']
        },
        rollupPreprocessor: {
            options: {
                watch: false,
                output: {
                    format: 'iife',
                    name: 'marktl',
                    sourcemap: 'inline'
                },
                plugins: [
                    rollupPlugins.nodeResolve(),
                    rollupPlugins.commonjs({
                        namedExports: {
                            'node_modules/chai/index.js': ['expect']
                        }
                    }),
                    rollupPlugins.typescript({
                        tsconfig: 'test/tsconfig.json'
                    }),
                    rollupIstanbul({
                        exclude: ['test/**/*.ts', 'node_modules/**/*.*'],
                        embedSource: true,
                        debug: true
                    })
                ]
            }
        },
        reporters: ['mocha', 'coverage-istanbul'],

        coverageIstanbulReporter: {
            reports: ['html', 'text-summary'],

            dir: 'coverage',

            skipFilesWithNoVerage: true,

            'report-config': {
                html: {
                    subdir: 'html'
                }
            }
        },

        client: {
            mocha: {
                opts: 'test/browser/mocha.opts'
            }
        },

        port: 9876,
        colors: true,
        autoWatch: true,
        usePolling: true,
        singleRun: true,
        concurrency: Infinity,
        logLevel: config.LOG_DEBUG,
        browsers: ['Chrome'],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-chai',
            '@metahub/karma-rollup-preprocessor',
            'karma-sourcemap-loader',
            'karma-coverage',
            'karma-coverage-istanbul-reporter',
            'karma-mocha-reporter'
        ]
    });
};
