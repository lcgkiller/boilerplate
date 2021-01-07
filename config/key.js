if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
} // dev 환경일 경우 NODE_ENV가 dev로 나오게끔, prod 환경이면 prod로 나오게끔
