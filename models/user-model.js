const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: { type: String, unique: false, require: true},
    email: { type: String, unique: true, require: true},
    password: { type: String, require: true},
    roles: [{ type: String, ref: 'role-model'}],
    isActivated: { type: Boolean, default: false},
    activationLink: { type: String},
});

module.exports = model('User', UserSchema);