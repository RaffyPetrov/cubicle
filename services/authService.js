const User = require('../models/User');
const jsonwebtoken = require('jsonwebtoken');
const { SALT_ROUNDS, SECRET } = require('../config/index.js');
const bcrypt = require('bcrypt');


const register = async ({username, password}) => {
    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({username, password: hash});
    
    return await user.save();
};

const login = async ({username, password}) => {
    let user = await User.findOne({username});

    if(!user) throw ({message: 'User not found!'});

    let isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw ({message: 'Wrong password!'});

    let token = jsonwebtoken.sign({ _id: user._id}, SECRET);

    return token;
};

module.exports = {
    register,
    login,
};