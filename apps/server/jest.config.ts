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
        '^.+\\.ts$': 'ts-jest'
    },
    collectCoverage    : true,
    collectCoverageFrom: [
        './src/domain/**/*.ts',
        './src/infrastructure/**/*.ts',
        './src/application/**/*.ts',
        '!**/*.module.ts',
        '!**/*.output.ts',
        '!**/*.dto.ts',
    ],
    setupFiles       : ['<rootDir>/test/setupTest.ts'],
    coverageDirectory: './coverage',
    testEnvironment  : 'node'
};
export default config;
