module.exports = {
  displayName: 'serverless-e2e',
  preset: '../../jest.preset.js',
  testTimeout: 90000,
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/e2e/serverless-e2e',
};