const Model = require('../models/restaurant');
const axios = require('axios');

const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:8082';


require("dotenv").config()

const redis = require('redis');

const url = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}`

async function connectRedis() {
    const client = redis.createClient({
        url
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();
    return client;
}


async function setCache(key, data) {
    const client = await connectRedis()
    client.set(key, JSON.stringify(data))
}

async function getCache(key) {
    const client = await connectRedis()
    const resp = await client.get(key)
    // console.log("CAche is resp", resp)
    if (resp) {
        return JSON.parse(resp)
    }
}



async function delCache(key) {
    const client = await connectRedis()
    const resp = await client.del(key)

}


module.exports = {
    getRestaurant: async (req) => {
        try {

            const ListFromCache = await getCache('RestaurantList');

            if (ListFromCache && ListFromCache.length > 0) {

                console.log('Fetching from cache - redis')

                return { status: 200, response: 'success', msg: 'Restaurant list.', data: ListFromCache || [] };

            } else {

                console.log('Fetching from - collection DB')

                const data = await Model.findAll(req);

                await setCache('RestaurantList', data);

                return { status: 200, response: 'success', msg: 'Restaurant list.', data: data || [] };
            }
        } catch (error) {
            console.log(error);
            // return error;
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    },
    getRestaurantById: async (req) => {
        // try {
        //     const data = await Model.findOne({ _id: req.params._id });
        //     return { status: 200, response: 'success', msg: 'Restaurant data.', data: data || {} };
        // } catch (error) {
        //     console.log(error);
        //     // return error;
        //     return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        // }

        const ListFromCache = await getCache('RestaurantList');

        if (ListFromCache && ListFromCache.filter(resturant => resturant._id === req.params._id).length > 0) {

            console.log('Fetching from cache - redis');

            const data = ListFromCache.filter(resturant => resturant._id === req.params._id);

            if (data) {
                return { status: 200, response: 'success', msg: 'Restaurant data.', data: data[0] || {} };
            }

        } else {

            console.log('Fetching from - collection DB')

            const data = await Model.findOne({ _id: req.params._id });

            return { status: 200, response: 'success', msg: 'Restaurant data.', data: data || {} };
        }
    },
    createRestaurant: async (req) => {
        try {

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

            var m = new Model(new_obj);

            const save = await m.save();

            if (save.name) {
                await delCache('RestaurantList');
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
                await delCache('RestaurantList');
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
                await delCache('RestaurantList');
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
            const response = await axios.get(`${ORDER_SERVICE_URL}/orders/get_specific_customers_order/${req.params.customer_id}`);
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
    searchRestaurants: async (req) => {
        try {
            const search = req.params.search_string;

            const ListFromCache = await getCache('RestaurantList');

            if (ListFromCache && ListFromCache.length > 0) {

                const filteredData = ListFromCache.filter(item => {
                    let found = false;
                    Object.keys(item).forEach(key => {
                        if (item[key] && item[key].indexOf && item[key].indexOf(search) > -1) {
                            found = true;
                        }
                    });
                    return found;
                });

                if (filteredData.length > 0) {

                    console.log('Fetching from cache - redis');

                    return { status: 200, response: 'success', msg: 'Restaurant list.', data: filteredData || [] };

                }
                else {
                    console.log('Fetching from - collection DB')

                    const data = await Model.find({
                        $or: [
                            { "name": { "$regex": req.params.search_string, "$options": "i" } },
                            { "city": { "$regex": req.params.search_string, "$options": "i" } },
                            { "state": { "$regex": req.params.search_string, "$options": "i" } },
                            { menus: { $elemMatch: { name: { "$regex": req.params.search_string, "$options": "i" } } } },
                            { menus: { $elemMatch: { category: { "$regex": req.params.search_string, "$options": "i" } } } }
                        ]
                    });

                    return { status: 200, response: 'success', msg: 'Restaurant list.', data: data || [] };
                }

            }
            else {
                console.log('Fetching from - collection DB')

                const data = await Model.find({
                    $or: [
                        { "name": { "$regex": req.params.search_string, "$options": "i" } },
                        { "city": { "$regex": req.params.search_string, "$options": "i" } },
                        { "state": { "$regex": req.params.search_string, "$options": "i" } },
                        { menus: { $elemMatch: { name: { "$regex": req.params.search_string, "$options": "i" } } } },
                        { menus: { $elemMatch: { category: { "$regex": req.params.search_string, "$options": "i" } } } }
                    ]
                });

                return { status: 200, response: 'success', msg: 'Restaurant list.', data: data || [] };
            }
        } catch (error) {
            console.log(error);
            // return error;
            return { status: 400, response: 'error', msg: 'Something went wrong.', data: error };
        }
    }

}