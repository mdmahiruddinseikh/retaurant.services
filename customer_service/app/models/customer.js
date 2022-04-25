var mongoose = require('mongoose');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var CustomerSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please send a valid email address']
    },
    full_name: { type: String },
    password: { type: String },
    mobile_no: { type: String },
    alternative_mobile_no: { type: String },
    address: [
        {
            address: { type: String },
            city: { type: String },
            state: { type: String },
            pin: { type: String },
            default: { type: String }
        }
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { collection: 'customers' });

//minimum 3 letter title
CustomerSchema.path('mobile_no').validate(function (value) {
    return value && value.length >= 10;
}, 'mobile should be minimum of 10 numbers');

CustomerSchema.statics.findAll = function (req) {
    return this.find().skip(req.query.skip || 0).limit(req.query.limit || 25).exec();// Should return a Promise
}
CustomerSchema.statics.login = function (req) {
    console.log('CustomerSchema.statics.login');
    return this.findOne({ email: req.body.email }).exec();// Should return a Promise
}

CustomerSchema.statics.update_customer = function (q, data) {
    return this.updateOne(
        q, data
    )
        .exec();
}

CustomerSchema.statics.delete = function (query) {
    return this.remove(query)
        .exec();// Should return a Promise
}

module.exports = mongoose.model('customers', CustomerSchema)

// mongoose.model('customers', CustomerSchema);

// module.exports = mongoose.model('customers')