// This file was written because Jest doesn't support ES6
// So to use ECMA 6 like import/export 

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    
  };

  