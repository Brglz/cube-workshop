const mongoose = require('mongoose');

const CubeSchema = new mongoose.Schema({
    name: { type: String, required: true, match: [/^[A-Za-z1-9 ]+$/, "Cube is not valid"], minlength: 5 },
    description: { type: String, required: true, maxlength: 500, match: [/^[A-Za-z1-9 ]+$/, "Cube is not valid"], minlength: 20 },
    imageUrl: { type: String, required: true },
    difficultyLevel: { type: Number, required: true, min: 1, max: 6 },
    accessories: [{ type: 'ObjectId', ref: 'Accessory' }],
    creatorId: { type: 'ObjectId', ref: 'User' }
})

CubeSchema.path('imageUrl').validate(function (url) {
    return url.startsWith('http://') || url.startsWith('https://');
}, 'Image url not valid');

module.exports = mongoose.model("Cube", CubeSchema);