import express from "express";
import errorHandller from "./middlewares/error.handler.middleware";
import BasicAuthMiddleware from "./middlewares/basic.auth.middleware";

import authRoute from "./routes/authorization.route";
import userRoute from "./routes/users.route";


const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const port = 3000;
const baseUrl = "http://localhost";

// Error handler configurator


// Start the server
app
  // .use(BasicAuthMiddleware)
  .use(userRoute)
  .use(authRoute)
  .use(errorHandller)
  .listen(3000, () => console.log(`Server running on ${baseUrl}:${port}`));
