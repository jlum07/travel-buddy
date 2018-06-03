const express = require("express");
const bodyParser = require("body-parser");
const tripAdvisor = require("./routes/tripAdvisor");
const morgan = require("morgan");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const app = express();
// Make the express app serve static assets (html, javascript, css) from the /public folder
app.use(express.static("public"));

app.use(morgan("dev"));

app.use("/trip-advisor", tripAdvisor);

app.listen(PORT, "0.0.0.0", "localhost", () =>
  console.log(`Listening on ${PORT}`)
);
