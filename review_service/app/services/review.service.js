const Model = require('../models/review');
const axios = require('axios');

const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:8082';

module.exports = {
    getReview: async (req) => {
        try {
            const data = await Model.findAll(req);
            return { status: 200, response: 'success', msg: 'Review list.', data: data || [] };
        } catch (error) {
            console.log(error);
            // return error;
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    getReviewById: async (req) => {
        try {
            const data = await Model.findOne({ _id: req.params._id });
            return { status: 200, response: 'success', msg: 'Restaurant data.', data: data || {} };
        } catch (error) {
            console.log(error);
            // return error;
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    getRestaurantReview: async (req) => {
        try {
            const data = await Model.find({ restaurant_id: req.params.restaurant_id });

            //avg rating calculation and total reviews

            const reviewRatings = await Model.review_ratings({ restaurant_id: req.params.restaurant_id });

            console.log(reviewRatings);

            return {
                status: 200,
                response: 'success',
                msg: 'Restaurant reviews.',
                data: data || {},
                review_ratings: reviewRatings[0] || {}
            };
        } catch (error) {
            console.log(error);
            // return error;
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    getCustomerReview: async (req) => {
        try {
            const data = await Model.find({ customer_id: req.params.customer_id });
            return { status: 200, response: 'success', msg: 'Customer review.', data: data || {} };
        } catch (error) {
            console.log(error);
            // return error;
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    createReview: async (req) => {
        try {
            var new_obj = {
                "restaurant_id": req.body.restaurant_id,
                "customer_id": req.body.customer_id,
                "description": req.body.description,
                "rating": req.body.rating
            };

            var m = new Model(new_obj);

            const save = await m.save();

            if (save._id) {
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
    }

}