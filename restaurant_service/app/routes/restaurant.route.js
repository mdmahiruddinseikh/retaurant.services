const express = require("express");
const restaurantController = require("../controllers/restaurant.controller");
const restaurantValidator = require("../validations/restaurant.validation");

const restaurantRoutes = express.Router();

//Middleware for validate token 
const jwtAuthCheck = (req, res, next) => {
    try {

        next();
        // const token = req.headers.token

        // const decoded = jwt.verify(token, JwtSecretKey);

        // if (decoded && decoded.email) {
        //     next()
        // }
        // else {
        //     res.json({ status: 400, response: 'error', msg: 'Something went wrong.' });
        // }
    } catch (error) {
        console.log(error);
        res.json({ status: 400, response: 'error', msg: 'Something went wrong.', data: error });
    }
}

restaurantRoutes.get("/", jwtAuthCheck, restaurantController.getRestaurant);
restaurantRoutes.get("/:_id", jwtAuthCheck, restaurantController.getRestaurantById);
restaurantRoutes.post("/", restaurantValidator.createCustomerSchemaValidation, restaurantController.createRestaurant);
restaurantRoutes.put("/:_id", jwtAuthCheck, restaurantController.updateById);
restaurantRoutes.delete("/:_id", jwtAuthCheck, restaurantController.deleteById);
restaurantRoutes.get("/:_id/orders", jwtAuthCheck, restaurantController.getOrders);


module.exports = restaurantRoutes;