module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transpile JavaScript files using Babel
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/', // Tell Jest to transform axios and any other ES module dependencies
  ],
}
