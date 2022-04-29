const express = require("express");
const restaurantController = require("../controllers/restaurant.controller");
const restaurantValidator = require("../validations/restaurant.validation");

const CUSTOMER_SERVICE_URL = process.env.CUSTOMER_SERVICE_URL || 'http://localhost:8081'

const restaurantRoutes = express.Router();

const axios = require('axios');

//Middleware for validate token 
const jwtAuthCheck = async (req, res, next) => {
    try {
        if (process.env.AUTH_VALIDATION === 'false') {
            next();
        }
        else {
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
        }
    } catch (error) {
        console.log(error);
        res.json({ status: 400, response: 'error', msg: 'Something went wrong.', data: error });
    }
}

restaurantRoutes.get("/", jwtAuthCheck, restaurantController.getRestaurant);
restaurantRoutes.get("/:_id", jwtAuthCheck, restaurantController.getRestaurantById);
restaurantRoutes.post("/", jwtAuthCheck, restaurantValidator.createCustomerSchemaValidation, restaurantController.createRestaurant);
restaurantRoutes.put("/:_id", jwtAuthCheck, restaurantController.updateById);
restaurantRoutes.delete("/:_id", jwtAuthCheck, restaurantController.deleteById);
restaurantRoutes.get("/:_id/orders", jwtAuthCheck, restaurantController.getOrders);


restaurantRoutes.get("/search/:search_string", restaurantController.searchRestaurants);


module.exports = restaurantRoutes;