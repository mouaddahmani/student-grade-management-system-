const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
const rootes = require("./api/rootes/rootes");
const error = require("./api/error/error");
const app = express();

const port = 8000;

app.use(cors());
app.use(parser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", rootes);
app.use(error);

app.listen(port, () => {
  console.log(`server runing on ${port}`);
});
