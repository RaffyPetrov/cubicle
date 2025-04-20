const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/index');

const register = async ({ username, password }) => {
    const existing = await User.findOne({ username });
    if (existing) throw new Error('Username already exists');

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });

    return await user.save(); // If this fails, we know it's a schema issue
};

const login = async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Wrong password');

    const token = jwt.sign({ _id: user._id }, SECRET);
    return token;
};

module.exports = {
    register,
    login,
};
