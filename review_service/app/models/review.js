var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    restaurant_id: { type: String },
    customer_id: { type: String },
    description: { type: String },
    rating: { type: Number },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { collection: 'reviews' });

ReviewSchema.statics.findAll = function (req) {
    return this.find().skip(req.query.skip || 0).limit(req.query.limit || 25).exec();// Should return a Promise
}

ReviewSchema.statics.review_ratings = function (param) {

    var pipeline = [
        {
            $match: {
                $and:
                    [
                        { restaurant_id: param.restaurant_id }
                    ]
            }
        },
        {
            $group:
            {
                _id: "restaurant_id",
                total_rating: { $sum: "$rating" },
                avg_rating: { $avg: "$rating" },
                total_rating_count: { $sum: 1 }
            }
        }
    ];
    console.log(pipeline)
    return this.aggregate(pipeline).exec();// Should return a Promise
}

ReviewSchema.statics.update = function (q, data) {
    return this.updateOne(
        q, data
    )
        .exec();
}

ReviewSchema.statics.delete = function (query) {
    return this.remove(query)
        .exec();// Should return a Promise
}

module.exports = mongoose.model('reviews', ReviewSchema);