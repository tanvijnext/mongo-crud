const User = require('../models/User')
const express = require('express')
const jwt = require('jsonwebtoken')
const verifyToken = require('../utils/token');
const bcrypt = require('bcrypt')
const router = express.Router();

router.post('/register', async(req, res) => {
    var data = req.body;
    try {
        const oldUser = await User.findOne({ email: data.email });
        console.log(oldUser)
        if (oldUser) {
            return res.send({
                message: 'user already exits... Please login ..'
            })
        }
        encpassword = await bcrypt.hash(data.password, 10);
        var usermodel = {
            name: data.name,
            email: data.email,
            password: encpassword
        }
        User.create(usermodel, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.send({
                    message: 'Registration Succesfully..',
                    data
                });
            }
        })
    } catch (error) {
        res.send({
            error: error
        })
    }
})

router.post('/login', async(req, res) => {
    try {
        var data = req.body;
        const userData = await User.findOne({ email: data.email })
        console.log(bcrypt.compare(data.password, userData.password))
        if (userData === null || userData === undefined) {
            res.send({
                message: 'email not found..'
            })
        } else if (!bcrypt.compare(data.password.toString(), userData.password.toString())) {
            res.send({
                message: 'Invalid  Password ..'
            })
        } else {
            const token = jwt.sign({ id: userData._id }, process.env.TOKEN_SECRET, {
                expiresIn: '5m'
            })
            console.log(userData)
                //await User.findByIdAndUpdate( {_id : userData._id},{$addToSet: {loginTokens: {Token: token}}},{new: true})
            res.send({
                message: 'Login Successfully...',
                Token: token
            })

        }

    } catch (error) {
        res.send({
            error: error
        })
    }
})

router.put('/update/:id', async(req, res) => {
    try {
        const _id = req.params.id;
        const updateUserData = await User.findByIdAndUpdate(_id, req.body, { new: true });
        if (updateUserData === null || _id !== req.params.id) {
            res.send({
                message: "User Not Found..."
            })
        } else {
            res.send({
                message: "User Update Successfully.."
            })
        }

    } catch (error) {
        res.send({
            error: error
        })
    }
})