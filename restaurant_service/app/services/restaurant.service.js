const Model = require('../models/restaurant');
const axios = require('axios');

module.exports = {
    getRestaurant: async (req) => {
        try {
            const data = await Model.findAll(req);
            return { status: 200, response: 'success', msg: 'Restaurant list.', data: data || [] };
        } catch (error) {
            console.log(error);
            // return error;
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    getRestaurantById: async (req) => {
        try {
            const data = await Model.findOne({ _id: req.params._id });
            return { status: 200, response: 'success', msg: 'Restaurant data.', data: data || {} };
        } catch (error) {
            console.log(error);
            // return error;
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    createRestaurant: async (req) => {
        try {
            console.log(req.body)

            var new_obj = {
                "name": req.body.name,
                "address": req.body.address,
                "city": req.body.city,
                "state": req.body.state,
                "cusine": req.body.cusine,
                "avg_rating": req.body.avg_rating,
                "total_reviews": req.body.total_reviews,
                "locations": req.body.locations,
                "menus": req.body.menus,
            };

            console.log('new_obj')
            console.log(new_obj)

            var m = new Model(new_obj);

            const save = await m.save();

            if (save.name) {
                return { status: 200, response: 'success', msg: 'Created.', data: save };
            }
            else {
                return { status: 400, response: 'error', msg: 'Something went wrong.', data: save };
            }
        } catch (error) {
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    updateById: async (req) => {
        try {
            const update = await Model.update({ _id: req.params._id }, req.body);

            if (update.modifiedCount > 0) {
                return { status: 200, response: 'success', msg: 'Updated successfully.', data: update };
            }
            else {
                return { status: 401, response: 'validationerror', msg: 'Invalid operation.', data: update };
            }
        } catch (error) {
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    deleteById: async (req) => {
        try {
            const deleted = await Model.delete({ _id: req.params._id });

            if (deleted.deletedCount > 0) {
                return { status: 200, response: 'success', msg: 'Deleted successfully.', data: deleted };
            }
            else {
                return { status: 401, response: 'validationerror', msg: 'Invalid operation.', data: deleted };
            }
        } catch (error) {
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    getOrders: async (req) => {
        try {
            const response = await axios.get(`http://localhost:8082/orders/get_specific_customers_order/${req.params.customer_id}`);
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

    },

}