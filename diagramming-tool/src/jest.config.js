// module.exports = {
//     transform: {
//       '^.+\\.jsx?$': 'babel-jest'
//     },
//     moduleNameMapper: {
//       '\\.css$': '<rootDir>/__mocks__/styleMock.js',
//     },
//   };
module.exports = {
  "testEnvironment": "jest-environment-jsdom",
  "transform": {
    "^.+\\.jsx?$": "babel-jest"
  },
  "moduleNameMapper": {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
}