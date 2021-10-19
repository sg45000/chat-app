import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    moduleFileExtensions: [
        'js',
        'json',
        'ts'
    ],
    rootDir  : '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    collectCoverage    : true,
    collectCoverageFrom: [
        './src/domain/**/*.ts',
        './src/infrastructure/**/*.ts',
        './src/application/**/*.ts',
    ],
    coverageDirectory: '../coverage',
    testEnvironment  : 'node'
};
export default config;
