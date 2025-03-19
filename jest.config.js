// Env variables
process.env = Object.assign(process.env, {
    CTX_LOG_ENABLED: 'false',
    MT_ROUTE_TEST_MODE: 'true',
})

/** @type {import('jest').Config} */
const config = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: './',
    testRegex: '.spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    coverageDirectory: '../coverage',
    coveragePathIgnorePatterns: ['./dist/*', './node_modules/*'],
    testEnvironment: 'node',
}

module.exports = config
