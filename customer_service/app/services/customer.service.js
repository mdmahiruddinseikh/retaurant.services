const Customer = require('../models/customer');
const axios = require('axios');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const bcrypt = require("bcrypt");

const JwtSecretKey = "Restaurant Service Secret Key";

module.exports = {
    getCustomer: async (req) => {
        try {
            const customers = await Customer.findAll(req);
            return { status: 200, response: 'success', msg: 'Customer list.', data: customers || [] };
        } catch (error) {
            console.log(error);
            // return error;
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    getCustomerById: async (req) => {
        try {
            const customer = await Customer.findOne({ _id: req.params._id });
            return { status: 200, response: 'success', msg: 'Customer data.', data: customer || {} };
        } catch (error) {
            console.log(error);
            // return error;
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    createCustomer: async (req) => {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(req.body.password, salt);

            var new_customer_obj = {
                "email": req.body.email,
                "full_name": req.body.full_name,
                "password": hash,
                "mobile_no": req.body.mobile_no,
                "alternative_mobile_no": req.body.alternative_mobile_no,
                "address": req.body.address
            };

            var m = new Customer(new_customer_obj);

            const saveCustomer = await m.save();

            if (saveCustomer.email) {
                return { status: 200, response: 'success', msg: 'New customer created.', data: saveCustomer };
            }
            else {
                return { status: 400, response: 'error', msg: 'Something went wrong.', data: saveCustomer };
            }
        } catch (error) {
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    updateCustomerById: async (req) => {
        try {
            const customerUpdate = await Customer.update_customer({ _id: req.params._id }, req.body);

            if (customerUpdate.modifiedCount > 0) {
                return { status: 200, response: 'success', msg: 'Customer data updated successfully.', data: customerUpdate };
            }
            else {
                return { status: 401, response: 'validationerror', msg: 'Invalid operation.', data: customerUpdate };
            }
        } catch (error) {
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    deleteCustomerById: async (req) => {
        try {
            const customerDelete = await Customer.delete({ _id: req.params._id });

            if (customerDelete.deletedCount > 0) {
                return { status: 200, response: 'success', msg: 'Customer data deleted successfully.', data: customerUpdate };
            }
            else {
                return { status: 401, response: 'validationerror', msg: 'Invalid operation.', data: customerUpdate };
            }
        } catch (error) {
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    customerLogin: async (req) => {
        try {
            const customer = await Customer.login(req);
            if (!customer) {
                return { status: 401, response: 'validationerror', msg: 'Email id not registered.', data: {} };
            } else {

                const password_compare = await bcrypt.compare(req.body.password, customer.password);

                if (password_compare === true) {

                    var token = jwt.sign({ email: req.body.email },
                        JwtSecretKey, { expiresIn: 60 * 60 });

                    return { status: 200, response: 'success', msg: 'Login Successfull.', data: customer, token: token };
                }
                else {
                    return { status: 401, response: 'validationerror', msg: 'Invalid credentials.', data: {}, token: "" };
                }
            }
        } catch (error) {
            console.log(error);
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }

    },
    verifyToken: async (req) => {
        try {
            const token = req.headers.token

            const decoded = jwt.verify(token, JwtSecretKey);

            if (decoded && decoded.email) {
                return { status: 200, response: 'success', msg: 'Token verified successfully.' };
            }
            else {
                return { status: 400, response: 'error', msg: 'Something went wrong.' };
            }
        } catch (error) {
            console.log(error);
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }

    },
    getCustomerOrders: async (req) => {
        try {
            // console.log(getCustomerOrders);
            const response = await axios.get(`http://localhost:8082/orders/get_specific_customers_order/${req.params._id}`);
            
            console.log(response);
            
            if (response) {
                return { status: 200, response: 'success', msg: 'Order list.', data: response.data.data || [] };
            }
            else {
                return { status: 400, response: 'error', msg: 'Something went wrong.', data: [] };
            }

        } catch (error) {
            console.log(error);
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }

    }
}