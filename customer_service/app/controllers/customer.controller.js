const customerService = require("../services/customer.service")


module.exports = {
    getCustomer : async (req, res) => {
        const response = await customerService.getCustomer(req)

        // res.json({ status: 200, response: 'success', data: orders || [] });
        res.json(response)
    },
    getCustomerById : async (req, res) => {
        const response = await customerService.getCustomerById(req);
        res.json(response);
    },
    createCustomer : async (req, res) => {
        const response = await customerService.createCustomer(req);
        res.json(response);
    },
    updateCustomerById : async (req, res) => {
        const orderUpdate = await customerService.updateCustomerById(req)
        res.json(orderUpdate)
    },
    deleteCustomerById : async (req, res) => {
        const response = await customerService.deleteCustomerById(req)
        res.json(response)
    },
    getCustomerOrders : async (req, res) => {
        const response = await customerService.getCustomerOrders(req)
        res.json(response)
    },
    customerLogin : async (req, res) => {
        const response = await customerService.customerLogin(req)
        res.json(response)
    },
    verifyToken : async (req, res) => {
        const response = await customerService.verifyToken(req)
        res.json(response)
    }
}