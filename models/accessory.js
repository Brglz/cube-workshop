const mongoose = require('mongoose');

const AccessorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxlength: 300 },
    imageUrl: { type: String, required: true },
    cubes: [{ type: 'ObjectId', ref: 'Cube' }]
})

AccessorySchema.path('imageUrl').validate(function (url) {
    return url.startsWith('http://') || url.startsWith('https://');
}, 'Image url not valid');

module.exports = mongoose.model('Accessory', AccessorySchema);