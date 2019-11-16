const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//item model
const User = require('../../models/User');

// @route POST api/users
// @description Register user
// @access Public
router.post('/', (req, res) => {
    //using destructuring to access the desired passed data
    const { name, email, password } = req.body;

    //simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Enter all fields' });
    }

    //checking for existing user
    //same as "{ email: email }"
    User.findOne({ email }).then(user => {
        if (user) return res.status(400).json({ msg: 'User already exists' });

        //if it doesnt exist
        const newUser = new User({
            name,
            email,
            password
        });

        //create salt (the bigger the number is, the more secure but also the more time it takes; 10 is common value) and hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                //we are actually storing the hashed password on the db
                newUser.password = hash;
                newUser.save().then(user => {
                    res.json({
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                });
            });
        });
    });
});

module.exports = router;
