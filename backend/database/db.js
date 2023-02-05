const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongoose
    .connect(process.env.MONGO_URI, connectionParams)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((error) => console.log(error));
};
