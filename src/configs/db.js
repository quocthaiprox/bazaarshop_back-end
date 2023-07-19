const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

async function connect() {
  console.log(process.env.DB_USERNAME);
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@bazaardb.zwyx9bg.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connect DB successfully!!");
  } catch (error) {
    console.log("Connect DB failed!!", error);
    process.exit(1);
  }
}

module.exports = { connect };
