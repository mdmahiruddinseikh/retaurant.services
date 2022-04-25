// Business logic
// Database etc 

const Order = require("../models/order");
const model = require('../models')

module.exports = {
    // params is object, for parameters from controllers
    getOrders: async (req) => {
        try {
            // return orders
            const include = req.query.include === 'all' ? [
                {
                    model: model.items,
                    as: 'items'
                }
            ] : [];

            const orders = await model.orders.findAll({
                include: include,
                offset: req.query.skip || 0,
                limit: req.query.limit || 50,
            });
            return { status: 200, response: 'success', msg: 'Order list.', data: orders || [] };
        } catch (error) {
            console.log(error);
            // return error;
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    getOrderById: async (req) => {
        try {
            const order = await model.orders.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: model.items,
                        as: 'items'
                    }
                ]
            });
            return { status: 200, response: 'success', msg: 'Order data.', data: order || {} };
        } catch (error) {
            console.log(error);
            // return error;
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },

    createOrder: async (req) => {
        try {
            const orderIn = await model.orders.create(req.body);

            req.body.items.forEach(function (item, i) {
                req.body.items[i].order_id = orderIn.id;
            });

            model.items.bulkCreate(req.body.items, { timestamps: false, });

            return { status: 200, response: 'success', msg: 'New order created.', data: orderIn };

        } catch (error) {
            console.log(error);
            // return error;
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    updateOrderById: async (req) => {
        try {

            // if (typeof req.body.order_status === 'undefined' || req.body.order_status == '' || req.body.order_status == null) {
            //     return { status: 401, response: 'validationerror', msg: 'Please send order status.' };
            // }

            // const user = await model.orders.update({ order_status: req.body.order_status }, {

            await model.orders.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            return { status: 200, response: 'success', msg: 'Order data updated successfully.' };
        } catch (error) {
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    deleteOrderById: async (req) => {
        try {
            const orderdelete = await model.orders.destroy({
                where: {
                    id: req.params.id
                }
            });
            if (orderdelete === 1) {
                return { status: 200, response: 'success', msg: 'Order deleted successfully.' };
            } else {
                return { status: 401, response: 'validationerror', msg: 'Invalid operation.' };
            }
        } catch (error) {
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    //orders for specific restaurant.
    get_specific_retaurants_order: async (req) => {
        try {
            const order = await model.orders.findAll({
                include: [
                    {
                        model: model.items,
                        as: 'items',
                        where: {
                            restaurant_id: req.params.restaurant_id
                        }
                    }
                ]
            });
            return { status: 200, response: 'success', msg: 'Order data.', data: order || {} };
        } catch (error) {
            console.log(error);
            // return error;
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    get_specific_customer_order: async (req) => {
        try {
            console.log('customer_id')
            console.log(req.params.customer_id)
            const order = await model.orders.findAll({
                where: {
                    customer_id: req.params.customer_id
                },
                include: [
                    {
                        model: model.items,
                        as: 'items',
                        
                    }
                ]
            });
            return { status: 200, response: 'success', msg: 'Order data.', data: order || [] };
        } catch (error) {
            console.log(error);
            // return error;
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
}