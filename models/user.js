const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 5, match: [/^[A-Za-z1-9]+$/, "Username is not valid"] },
    password: { type: String, required: true },
})

module.exports = mongoose.model("User", UserSchema);