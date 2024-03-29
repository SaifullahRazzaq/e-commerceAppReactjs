const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, required: true },
    password: { type: String },
    token: { type: String },
    profileImage: { type: String },
});

module.exports = mongoose.model("user", userSchema);