import js from '@eslint/js';
import globals from 'globals';
import mochaPlugin from 'eslint-plugin-mocha';
import pluginSecurity from 'eslint-plugin-security';

const files = ['src/**/*.js', 'test/**/*.js', 'Gruntfile.cjs', 'karma.conf.cjs', 'eslint.config.js'];

export default [
    {
        ...pluginSecurity.configs.recommended,
        files,
    },
    {
        name: 'security plugin overrides',
        files,
        rules: {
            'security/detect-object-injection': 'off',
            'security/detect-unsafe-regex'    : 'off'
        }
    },
    {
        ...js.configs.recommended,
        files,
    },
    {
        ...mochaPlugin.configs.flat.recommended,
        files,
    },
    {
        name           : 'wampy eslint config',
        files,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType : 'module',
            globals    : {
                ...globals.browser,
                ...globals.node,
                ...globals.amd,
                ...globals.commonjs,
                'msgpack': true,
                'mocha'  : true
            }
        },
        linterOptions  : {
            reportUnusedDisableDirectives: 'warn'
        },
        rules          : {
            'consistent-this'           : ['warn', 'self'],
            'curly'                     : ['error'],
            'default-case-last'         : ['error'],
            'default-param-last'        : ['error'],
            'eqeqeq'                    : ['error'],
            'prefer-const'              : ['warn'],
            'no-console'                : 'off',
            'no-eval'                   : ['error'],
            'no-duplicate-imports'      : ['error'],
            'no-promise-executor-return': ['error'],
            'no-self-compare'           : ['error'],
            'no-unreachable-loop'       : ['error'],
            'no-use-before-define'      : ['error'],
            'no-useless-assignment'     : ['error'],
            'no-unused-vars'            : ['warn', { 'args': 'none' }],
            'radix'                     : ['error'],
            'require-atomic-updates'    : ['error'],
            'max-depth'                 : ['error', 5],
            'max-nested-callbacks'      : ['error', 5],
            'max-params'                : ['error', 5],
        }
    },
    {
        ignores: ['coverage/*']
    }
];
