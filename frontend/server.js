import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, "dist")));

// Redirect every request to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Listen on port 80
app.listen(80, () => {
  console.log("Server is running on http://localhost:80");
});
