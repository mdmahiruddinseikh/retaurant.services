const express = require("express");
const customerController = require("../controllers/customer.controller");
const customerValidator = require("../validations/customer.validation");

const customerRoutes = express.Router();
const jwt = require('jsonwebtoken');
const JwtSecretKey = "Restaurant Service Secret Key";

//Middleware for validate token 
const jwtAuthCheck = (req, res, next) => {
    try {
        const token = req.headers.token

        const decoded = jwt.verify(token, JwtSecretKey);

        if (decoded && decoded.email) {
            next()
        }
        else {
            res.json({ status: 400, response: 'error', msg: 'Something went wrong.' });
        }
    } catch (error) {
        console.log(error);
        res.json({ status: 400, response: 'error', msg: 'Something went wrong.', data: error });
    }
}

customerRoutes.get("/",jwtAuthCheck, customerController.getCustomer);
customerRoutes.get("/:_id",jwtAuthCheck, customerController.getCustomerById);
customerRoutes.post("/", customerValidator.createCustomerSchemaValidation, customerController.createCustomer);
customerRoutes.put("/:_id", customerValidator.updateCustomerSchemaValidation, customerController.updateCustomerById);
customerRoutes.delete("/:_id",jwtAuthCheck, customerController.deleteCustomerById);
customerRoutes.get("/:_id/orders",jwtAuthCheck, customerController.getCustomerOrders);
customerRoutes.post("/login", customerValidator.customerLoginReqObjValidation, customerController.customerLogin);

customerRoutes.post("/verifyToken", customerController.verifyToken)


module.exports = customerRoutes;