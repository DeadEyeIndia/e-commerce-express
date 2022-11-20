import mongoose from "mongoose";

const database = () => {
  mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) =>
      console.log(`Connected with server => ${data.connection.host}`)
    )
    .catch((error) => {
      console.error("Connection error", error);
      process.exit(1);
    });
};

export default database;
