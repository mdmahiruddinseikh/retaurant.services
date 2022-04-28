var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    cusine: { type: String },
    contact_no: { type: String },
    avg_rating: { type: Number },
    total_reviews: { type: Number },
    locations: { type: Array },
    menus: [
        {
            name: { type: String },
            category: { type: String },
            price: { type: Number },
            created_at: { type: Date, default: Date.now },
            updated_at: { type: Date, default: Date.now }
        }
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { collection: 'restaurants' });

RestaurantSchema.statics.findAll = function (req) {
    return this.find().skip(req.query.skip || 0).limit(req.query.limit || 25).exec();// Should return a Promise
}

RestaurantSchema.statics.update = function (q, data) {
    return this.updateOne(
        q, data
    )
        .exec();
}

RestaurantSchema.statics.delete = function (query) {
    return this.remove(query)
        .exec();// Should return a Promise
}

module.exports = mongoose.model('restaurants', RestaurantSchema);