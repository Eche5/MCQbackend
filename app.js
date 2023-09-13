const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const userRoutes = require("./Routes/userRoute");
const credentials = require("./Middlewares/credentials");
const questionRoute = require("./Routes/questionRoute");
const resultRoute = require("./Routes/resultRoute");
const refreshRoute = require("./Routes/refreshRoute");

const app = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

//middleware for cookies
app.use(express.json());
app.use(cookieParser());

app.use("/", refreshRoute);

app.use("/", userRoutes);

app.use("/", questionRoute);

app.use("/", resultRoute);

module.exports = app;
