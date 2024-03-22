const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "examples"),
  ignore: (file) => {
    if (file.includes(".ts")) {
      return true;
    }

    return false;
  },
};
