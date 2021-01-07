const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

const config = require("./config/key");
const { User } = require("./models/User");

// body-parser 옵션
// (1) /applicaiton/x-www-form/urlencoded를 분석해서 가져올 수 있게끔 함
app.use(bodyParser.urlencoded({ extended: true }));
// (2) /applicaiton/json 분석해서 가져올 수 있게끔 함
app.use(bodyParser.json());

const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongoose Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 회원가입
app.post("/register", (req, res) => {
  // 회원 가입할 때 필요한 정보들을 Client에서 가져오면 데이터 베이스에 넣어준다. (User model을 가져와야 함)
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
