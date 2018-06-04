const express = require("express");
const bodyParser = require("body-parser");
const tripAdvisor = require("./routes/tripAdvisor");
const city = require("./routes/city")
const morgan = require("morgan");
const cors = require("cors")

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const app = express();

app.use(cors())
// Make the express app serve static assets (html, javascript, css) from the /public folder
app.use(express.static("public"));

app.use(morgan("dev"));

app.use("/trip-advisor", tripAdvisor);

app.use("/city", city)


app.listen(PORT, "0.0.0.0", "localhost", () =>
  console.log(`Listening on ${PORT}`)
);
