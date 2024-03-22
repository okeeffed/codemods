const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "tmp"),
  ignore: (file) => {
    if (file.includes(".ts")) {
      return true;
    }

    return false;
  },
};
