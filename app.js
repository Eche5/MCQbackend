const express = require("express");
const userRoutes = require("./Routes/userRoute");
const questionRoute = require("./Routes/questionRoute");
const cors = require("cors-express");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/questions", questionRoute);

module.exports = app;
