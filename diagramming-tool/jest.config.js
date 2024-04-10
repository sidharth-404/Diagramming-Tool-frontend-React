module.exports = {
  "testEnvironment": "jest-environment-jsdom",
  "transform": {
    "^.+\\.js?$": "babel-jest"
  },
  "moduleNameMapper": {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
}