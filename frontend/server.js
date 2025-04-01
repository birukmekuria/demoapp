//Import express and path modules
const express = require("express");
const path = require("path");
//Create an instance of express
const app = express();
//Serve the static files from the React app
app.use(express.static(path.join(__dirname, "dist")));
//Redirect every request to the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});
//Listen to the default port 80
app.listen(80);

