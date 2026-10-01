module.exports = {
  "*": "prettier --ignore-unknown --write",
  "**/*.scss": "stylelint --fix",
  "*.{ts,tsx}": "eslint --fix",
};
