const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const dbConnect = require("./config/dbConfig");

const errorMiddleware = require("./middlewares/errorMiddleware");

const routes = require("./routes/routes");

require("dotenv").config();

app.use(express.json());

app.use(cors());

const port = process.env.PORT || 3000;

dbConnect();

app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "./build"))
  );
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "./build/index.html")
    );
  });
}

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
