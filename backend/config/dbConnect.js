const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB connected successfully"))
    .catch((e) => console.log("error in DB connection", e));
};
