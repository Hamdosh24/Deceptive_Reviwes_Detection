const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult, check } = require('express-validator');




const User = require('../models/users');
const checkAuth = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/check-admin');



router.post('/create-admin', checkAuth, checkAdmin, (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
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
                        const adminUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash,
                            role: 'Admin' // تعيين الدور كأدمن
                        });
                        adminUser.save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'Admin created'
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


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
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err || !result) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                        role: user[0].role // تضمين الدور في التوكن
                    }, process.env.JWT_KEY,
                        { expiresIn: '1h' },
                    );
                    return res.status(200).json({
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
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});


router.put('/ubdateuser/:id', checkAuth, async (req, res) => {
    // تحقق من صحة البيانات المدخلة (اختياري)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // استخراج id من params
    const userId = req.params.id;
    const { firstName, lastName, oldPassword, newPassword, role } = req.body;

    try {
        // البحث عن المستخدم في قاعدة البيانات
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // إذا كانت كلمة المرور الجديدة موجودة، تحقق من كلمة المرور القديمة أولاً
        if (newPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Old password is incorrect' });
            }
        }

        // تشفير كلمة المرور الجديدة إذا تم تقديمها
        let hashedPassword;
        if (newPassword) {
            hashedPassword = await bcrypt.hash(newPassword, 10);
        }

        // التحقق من صلاحيات المستخدم لتغيير الدور
        // يمكنك تعديل هذا الجزء ليتناسب مع نظام صلاحياتك
        if (role && req.userData.role !== 'Admin') {
            return res.status(403).json({ message: 'You do not have permission to change user roles' });
        }

        // تحديث المستخدم في قاعدة البيانات
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName,
                lastName,
                ...(newPassword && { password: hashedPassword }),  // تحديث كلمة المرور إذا تم تقديمها فقط
                ...(role && { role })  // تحديث الدور إذا تم تقديمه
            },
            { new: true }  // لإعادة المستخدم المحدث في الاستجابة
        );

        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;



router.delete('/:userId',checkAuth, (req, res, next) => {
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

