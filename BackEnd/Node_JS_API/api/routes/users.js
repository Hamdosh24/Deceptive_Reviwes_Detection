const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');




const User = require('../models/users');

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {//اذا 0 بتكون نول 
                return res.status(409).json({
                    message: 'Email already exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });

                            });
                    }
                });

            }
        })
        .catch();
});

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: '11Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                console.log(user[0].password);
                if (err) {
                    return res.status(401).json({
                        message: '22Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY,
                        { expiresIn: '1h' },
                    );
                    return res.status(401).json({
                        message: 'Auth successful',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
})


router.put('/updateuser/:id', async (req, res) => {
    // تحقق من صحة البيانات المدخلة (اختياري)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // استخراج id من params
    const userId = req.params.id;
    const { firstName, lastName, password } = req.body;

    try {
        // إذا كانت كلمة المرور موجودة في الطلب، قم بتشفيرها
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // تحديث المستخدم في قاعدة البيانات
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName,
                lastName,
                ...(password && { password: hashedPassword })  // تحديث كلمة المرور إذا تم تقديمها فقط
            },
            { new: true }  // لإعادة المستخدم المحدث في الاستجابة
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});


router.delete('/:userId', (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
        .then(() => {
            res.status(200).json({ message: 'User deleted' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete user' });
        });
});



module.exports = router;
