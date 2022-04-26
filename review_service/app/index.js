"use strict";

// to define express application

const express = require('express');
const cors = require('cors');
const restaurantRoutes = require('./routes/review.route');
const body_parser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();

app.use(cors());
app.use(body_parser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(body_parser.json({limit: '50mb'}));

//express error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use("/reviews", restaurantRoutes)

const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs/reviews_service', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/health", (req, res) => {
    res.send("OK")
})



module.exports = app;