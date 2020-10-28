const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const privateKey = 'secret';

const generateUserToken = (userObj) => {
    return token = jwt.sign({ userId: (userObj)._id, username: userObj.username }, privateKey)
}

const saveUser = async (req, res) => {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = new User({
            username,
            password: hashedPassword
        })

        const userObj = await user.save();

        const token = generateUserToken(userObj);


        res.cookie('aid', token);

        return token
    } catch (err) {
        return {
            error: true,
            message: err
        }
    }


}

const verifyUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username })
        if (!user) {
            return {
                error: true,
                message: 'There is no such user'
            }
        }
        const status = await bcrypt.compare(password, user.password);
        if (status) {
            const token = generateUserToken(user);
            res.cookie('aid', token);
        }
        return {
            error: !status,
            message: status || 'Wrong password'
        }
    } catch (err) {
        return {
            error: true,
            message: 'There is no such user',
            status
        }
    }


}

const checkAuthentication = (req, res, next) => {
    const token = req.cookies['aid'];

    if (!token) {
        return res.redirect('/')
    }

    try {
        jwt.verify(token, 'secret');
        next();
    } catch (error) {
        return res.redirect('/')
    }
}

const guestAccess = (req, res, next) => {
    const token = req.cookies['aid'];

    if (token) {
        return res.redirect('/')
    }

    next();
}

const getUserStatus = (req, res, next) => {
    const token = req.cookies['aid'];

    if (!token) {
        req.isLogged = false;
    }

    try {
        jwt.verify(token, 'secret');
        req.isLogged = true;
    } catch (error) {
        req.isLogged = false;
    }
    next();
}

const authAccessJSON = (req, res, next) => {
    const token = req.cookies['aid'];

    if (!token) {
        return res.json({
            error: 'Not authenticated'
        })
    }

    try {
        jwt.verify(token, 'secret');
        next();
    } catch (error) {
        return res.json({
            error: 'Not authenticated'
        })
    }
}

module.exports = { saveUser, verifyUser, checkAuthentication, guestAccess, getUserStatus, authAccessJSON };