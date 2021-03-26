const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const db = require("./models/index");
const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();
// access config var
const secret = process.env.TOKEN_SECRET;

var corsOptions = {
  origin: "*"//"http://localhost:8181"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8181;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

require("./routes/user.routes")(app);
require("./routes/cliente.routes")(app);
