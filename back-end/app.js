const express       = require("express");
const bodyParser    = require("body-parser");
const tripAdvisor   = require("./routes/tripAdvisor");
const city          = require("./routes/city");
// const users         = require("./routes/users");
const morgan        = require("morgan");
const cors          = require("cors");
const knexConfig    = require("./knexfile");
const knex          = require("knex")(knexConfig['development']);
const knexLogger    = require('knex-logger');

const usersRoutes   = require("./routes/users");


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(knexLogger(knex));

app.use(cors())
// Make the express app serve static assets (html, javascript, css) from the /public folder
app.use(express.static("public"));

app.use(morgan("dev"));

app.use("/trip-advisor", tripAdvisor);

app.use("/city", city);

app.use("/users", usersRoutes(knex));


app.listen(PORT, "0.0.0.0", "localhost", () =>
  console.log(`Listening on ${PORT}`)
);

