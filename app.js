const express = require("express");
const connectDB = require("./database/database");
const app = express();
require("dotenv").config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoute = require("./routes/authRoute");

app.use("/api/auth", authRoute);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
