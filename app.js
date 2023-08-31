import dotenv from 'dotenv';
import express, { urlencoded, json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import listEndpoints from 'express-list-endpoints';
import compression from 'compression';
import cacheRoute from './middleware/cacheRoute.js';
import rateLimit from 'express-rate-limit';

/**
 * You will create the routes for institutions and departments later
 */

import auth from './routes/v1/auth.js';
import authRoute from './middleware/authRoute.js';
import character from './routes/v1/character.js';
import builds from './routes/v1/builds.js';
import items from './routes/v1/items.js';
import location from './routes/v1/location.js';

dotenv.config();
const app = express();

const BASE_URL = 'api';

/**
 * The current version of this API is 1
 */
const CURRENT_VERSION = 'v1';

const PORT = process.env.PORT;

const limit = rateLimit({
  windowMs: 60000, //1 minute duration in milliseconds
  max: 50,
  message: 'You have exceeded 50 requests in 1 minute limit!',
  headers: true,
});

app.use(limit);
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cacheRoute);

const getAvailableEndpoints = () => {
  const endpoints = listEndpoints(app);
  const data = [];
  endpoints.forEach((endpoint) => {
    //loop through endpoints
    data.push(`${endpoint.path}`);
  });
  return data;
};

app.use(`/${BASE_URL}/${CURRENT_VERSION}/builds`, authRoute, builds);
app.use(`/${BASE_URL}/${CURRENT_VERSION}/character`, authRoute, character);
app.use(`/${BASE_URL}/${CURRENT_VERSION}/items`, authRoute, items);
app.use(`/${BASE_URL}/${CURRENT_VERSION}/auth`, auth);
app.use(`/${BASE_URL}/${CURRENT_VERSION}/location`, authRoute, location);
app.get(`/${BASE_URL}/${CURRENT_VERSION}`, (req, res) =>
  res.status(200).json(getAvailableEndpoints())
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
