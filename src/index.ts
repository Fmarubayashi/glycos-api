import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routes from "./routes";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
