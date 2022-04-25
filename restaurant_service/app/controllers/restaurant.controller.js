const restaurantService = require("../services/restaurant.service")


module.exports = {
    getRestaurant : async (req, res) => {
        const response = await restaurantService.getRestaurant(req)
        res.json(response)
    },
    getRestaurantById : async (req, res) => {
        const response = await restaurantService.getRestaurantById(req);
        res.json(response);
    },
    createRestaurant : async (req, res) => {
        const response = await restaurantService.createRestaurant(req);
        res.json(response);
    },
    updateById : async (req, res) => {
        const orderUpdate = await restaurantService.updateById(req)
        res.json(orderUpdate)
    },
    deleteById : async (req, res) => {
        const response = await restaurantService.deleteById(req)
        res.json(response)
    },
    getOrders : async (req, res) => {
        console.log('getOrders')
        const response = await restaurantService.getOrders(req)
        res.json(response)
    }
}