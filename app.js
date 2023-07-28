const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const feedbackRouter = require("./routes/feedbackRoutes");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/feedbacks", feedbackRouter);

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(console.log("Connected to DATABASE"));

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
