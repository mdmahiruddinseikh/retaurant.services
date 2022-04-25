const orderService = require("../services/order.service")


module.exports = {
    getOrders : async (req, res) => {
        const orders = await orderService.getOrders(req)

        // res.json({ status: 200, response: 'success', data: orders || [] });
        res.json(orders)
    },
    getOrderById : async (req, res) => {
        const order = await orderService.getOrderById(req);
        res.json(order);
    },
    createOrder : async (req, res) => {
        const order = await orderService.createOrder(req);
        res.json(order);
    },
    updateOrderById : async (req, res) => {
        const orderUpdate = await orderService.updateOrderById(req)
        res.json(orderUpdate)
    },
    deleteOrderById : async (req, res) => {
        const orders = await orderService.deleteOrderById(req)
        res.json(orders)
    },
    get_specific_retaurants_order : async (req, res) => {
        const orders = await orderService.get_specific_retaurants_order(req)
        res.json(orders)
    },
    get_specific_customer_order : async (req, res) => {
        const orders = await orderService.get_specific_customer_order(req)
        res.json(orders)
    }
}