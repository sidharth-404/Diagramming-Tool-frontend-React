module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    moduleNameMapper: {
      '^@components(.*)$': '<rootDir>/src/Component$1' // Adjust the mapping based on your project structure
    }
};