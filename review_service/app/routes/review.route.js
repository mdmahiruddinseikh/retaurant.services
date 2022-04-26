const express = require("express");
const reviewController = require("../controllers/review.controller");
const reviewValidator = require("../validations/review.validation");

const CUSTOMER_SERVICE_URL = process.env.CUSTOMER_SERVICE_URL || 'http://localhost:8081'

const reviewRoutes = express.Router();

const axios = require('axios');

//Middleware for validate token 
const jwtAuthCheck = async (req, res, next) => {
    try {
        const response = await axios({
            method: 'post', //you can set what request you want to be
            url: `${CUSTOMER_SERVICE_URL}/customers/verifyToken`,
            headers: {
                token: req.headers.token
            }
        });
        if (response.data.status != 200) {
            res.json(response.data);
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.json({ status: 400, response: 'error', msg: 'Something went wrong.', data: error });
    }
}

reviewRoutes.get("/", jwtAuthCheck, reviewController.getReview);
reviewRoutes.get("/:_id", jwtAuthCheck, reviewController.getReviewById);
reviewRoutes.get("/:restaurant_id/restaurant", jwtAuthCheck, reviewController.getRestaurantReview);
reviewRoutes.get("/:customer_id/customer", jwtAuthCheck, reviewController.getCustomerReview);
reviewRoutes.post("/", reviewValidator.createReviewSchemaValidation, reviewController.createReview);
reviewRoutes.put("/:_id", jwtAuthCheck, reviewController.updateById);
reviewRoutes.delete("/:_id", jwtAuthCheck, reviewController.deleteById);

// reviewRoutes.delete("/:", jwtAuthCheck, reviewController.deleteById);

module.exports = reviewRoutes;