const express = require('express');
const apiRouter = express.Router();
const itemsRouter = require('./items');


apiRouter.use('/items', itemsRouter);


module.exports = apiRouter;