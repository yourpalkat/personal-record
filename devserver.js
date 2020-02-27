'use strict';

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const { applyMiddleware } = require('./api/utils');
const middleWare = require('./api/middleware');

// 1. Create main express intance
const router = express();

// 2. Require routes
const { router: userRoutes } = require('./api/routes/users/userRoutes');
const { router: runRoutes } = require('./api/routes/runs/runRoutes');

// 3. Require conatants
const { URL, PORT } = require('./api/utils/constants');

// 4. Ensure that the router is using body parser to appropriately format incoming requests
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// 5. Apply all our middleware
applyMiddleware(middleWare, router);

// 6. Utilise routes
router.use('/api/users', userRoutes);
router.use('/api/runs', runRoutes);

// 7. Create a server from express instance
const server = http.createServer(router);

// 8. Start server
mongoose
  .connect(URL, { useNewUrlParser: true })
  .then(async () => {
    console.log(`Connected to database at ${URL}`);
    server.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  })
