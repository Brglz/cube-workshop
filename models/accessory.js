const mongoose = require('mongoose');

const AccessorySchema = new mongoose.Schema({
    name: { type: String, required: true, match: [/^[A-Za-z1-9 ]+$/, "Accessory is not valid"], minlength: 5 },
    description: { type: String, required: true, maxlength: 500, match: [/^[A-Za-z1-9 ]+$/, "Accessory is not valid"], minlength: 20 },
    imageUrl: { type: String, required: true },
    cubes: [{ type: 'ObjectId', ref: 'Cube' }]
})

AccessorySchema.path('imageUrl').validate(function (url) {
    return url.startsWith('http://') || url.startsWith('https://');
}, 'Image url not valid');

module.exports = mongoose.model('Accessory', AccessorySchema);