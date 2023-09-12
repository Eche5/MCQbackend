const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log("DB is running");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
