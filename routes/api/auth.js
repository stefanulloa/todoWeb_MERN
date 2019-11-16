const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//item model
const User = require('../../models/User');

// @route POST api/auth
// @description Login/Authenticate user
// @access Public
router.post('/', (req, res) => {
    //using destructuring to access the desired passed data
    const { email, password } = req.body;

    //simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Enter all fields' });
    }

    //checking for existing user
    //same as "{ email: email }"
    User.findOne({ email }).then(user => {
        if (!user) return res.status(400).json({ msg: 'User does not exists' });

        bcrypt.compare(password, user.password).then(isMatch => {
            //in case password is not correct
            if (!isMatch)
                return res.status(400).json({ msg: 'Invalid credentials ' });

            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        //same as "token: token"
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            );
        });
    });
});

// @route GET api/auth/user
// @description Get user data
// @access Private
//getting user info by providing user token
router.get('/user', auth, (req, res) => {
    //we have req.user because it is given by the auth middleware
    //we dont want to return the password
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;
