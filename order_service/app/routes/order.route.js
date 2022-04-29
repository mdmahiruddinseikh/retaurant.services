const express = require("express");
const Joi = require("joi");
const orderController = require("../controllers/order.controller");
const orderValidator = require("../validations/order.validation");

const orderRoutes = express.Router()


const CUSTOMER_SERVICE_URL = process.env.CUSTOMER_SERVICE_URL || 'http://localhost:8081'

const axios = require('axios');

//Middleware for validate token 
const jwtAuthCheck = async (req, res, next) => {
    try {
        if (process.env.AUTH_VALIDATION === 'false') {
            next();
        }
        else {
            // console.log('req.headers.token');
            // console.log(req.headers.token);
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

orderRoutes.get("/", jwtAuthCheck, orderController.getOrders);
orderRoutes.get("/:id", jwtAuthCheck, orderController.getOrderById);
orderRoutes.post("/", jwtAuthCheck, orderValidator.createOrderSchemaValidation, orderController.createOrder);
orderRoutes.put("/:id", jwtAuthCheck, orderController.updateOrderById);
orderRoutes.delete("/:id", jwtAuthCheck, orderController.deleteOrderById);

orderRoutes.get("/get_specific_retaurants_order/:restaurant_id", jwtAuthCheck, orderController.get_specific_retaurants_order);
orderRoutes.get("/get_specific_customers_order/:customer_id", jwtAuthCheck, orderController.get_specific_customer_order);

module.exports = orderRoutes;