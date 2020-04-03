const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const main = async () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(express.static("public"));

  app.use(require("morgan")("dev"));
  app.use(require("compression")());

  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/budget",
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  );

  // routes
  app.use(require("./routes/api.js"));

  app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`);
  });
};

main();
