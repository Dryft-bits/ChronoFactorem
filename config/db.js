import { connect } from "mongoose";
import { get } from "config";
const mongoURI = get("mongoURI");

// Connects to database
const connectDB = async () => {
  try {
    await connect(mongoURI, {
      // Change deprecated settings to resolve warnings
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("LOG: MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
