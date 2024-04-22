module.exports = {
  "testEnvironment": "jest-environment-jsdom",
  "transform": {
    "^.+\\.js?$": "babel-jest"
  },
  "transformIgnorePatterns": [     'node_modules/(?!my-library-dir)/',   ],
  "moduleNameMapper": {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
}