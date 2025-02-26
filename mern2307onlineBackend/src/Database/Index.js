const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const databaseInstace = mongoose.connect(process.env.DATABASE_URL);
    if (databaseInstace) {
      console.log("Database Connected");
    }
  } catch (error) {
    console.log("From Database Connection Error ", error);
  }
};

module.exports = { dbConnection };
