const express = require("express");
const Joi = require("joi");
const orderController = require("../controllers/order.controller");
const orderValidator = require("../validations/order.validation");

const orderRoutes = express.Router()

orderRoutes.get("/", orderController.getOrders);
orderRoutes.get("/:id", orderController.getOrderById);
orderRoutes.post("/", orderValidator.createOrderSchemaValidation, orderController.createOrder);
orderRoutes.put("/:id", orderController.updateOrderById);
orderRoutes.delete("/:id", orderController.deleteOrderById);

orderRoutes.get("/get_specific_retaurants_order/:restaurant_id", orderController.get_specific_retaurants_order);
orderRoutes.get("/get_specific_customers_order/:customer_id", orderController.get_specific_customer_order);

module.exports = orderRoutes;