const { Schema, model } = require('mongoose');

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refrechToken: {type: String, require: true},
});

module.exports = model('RoleSchema', UserSchema);