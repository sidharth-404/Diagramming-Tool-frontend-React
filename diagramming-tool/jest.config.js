module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',
    },
    
      "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"]
    
    
  };