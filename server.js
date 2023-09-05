const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;
console.log(DB);

mongoose.connect(DB).then(() => {
  console.log("DB is running");
});

const PORT = 7000;

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
