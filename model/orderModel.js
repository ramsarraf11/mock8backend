const mongoose = require("mongoose")


const orderSchema = mongoose.Schema({
    user : { type: Object, ref: String},
    restaurant: { type: Object, ref: String },
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    status: String
})

const orderModel = new mongoose.model("orderdata", orderSchema)

module.exports = { orderModel }