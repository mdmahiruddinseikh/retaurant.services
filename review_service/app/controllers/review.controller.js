const reviewService = require("../services/review.service")


module.exports = {
    getReview : async (req, res) => {
        const response = await reviewService.getReview(req)
        res.json(response)
    },
    getReviewById : async (req, res) => {
        const response = await reviewService.getReviewById(req);
        res.json(response);
    },
    getRestaurantReview : async (req, res) => {
        const response = await reviewService.getRestaurantReview(req);
        res.json(response);
    },
    getCustomerReview : async (req, res) => {
        const response = await reviewService.getCustomerReview(req);
        res.json(response);
    },
    createReview : async (req, res) => {
        const response = await reviewService.createReview(req);
        res.json(response);
    },
    updateById : async (req, res) => {
        const orderUpdate = await reviewService.updateById(req)
        res.json(orderUpdate)
    },
    deleteById : async (req, res) => {
        const response = await reviewService.deleteById(req)
        res.json(response)
    }
}