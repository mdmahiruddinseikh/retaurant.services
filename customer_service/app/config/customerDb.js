
var mongoose = require("mongoose");

require("../models/customer");
 

module.exports = async function connectMongo() {
    const MONGO_URL= 
    `mongodb+srv://restaurant_service:nJ0FPyHJQK2AZPbS@cluster0.r4xqn.mongodb.net/restaurantservice?retryWrites=true&w=majority`
 
    return await mongoose.connect(MONGO_URL);
}