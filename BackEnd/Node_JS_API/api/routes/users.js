const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');




const User = require('../models/users');
const checkAuth = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/check-admin');


router.post('/create_admin', checkAuth, checkAdmin, async (req, res) => {
    try {
        // تحقق من وجود المستخدم بناءً على البريد الإلكتروني
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        const adminUser = new User({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            role: 'Admin'
        });

        await adminUser.save();
        res.status(201).json({ message: 'Admin created' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/update_role/:id', checkAuth, checkAdmin, async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === role) {
            return res.status(400).json({ message: 'New role is the same as current role' });
        }

        user.role = role;
        const updatedUser = await user.save();

        return res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) { // إذا وجد البريد الإلكتروني
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
                            password: hash,
                            role:  'User'
                        });
                        user.save()
                            .then(result => {
                                console.log(result);

                                // توليد التوكين
                                const token = jwt.sign({
                                    userId: result._id,
                                    role: result.role 
                                }, process.env.JWT_KEY, {
                                    expiresIn: '1h' // مدة صلاحية التوكين
                                });

                               
                                res.status(201).json({
                                    message: 'User created',
                                    token: token,
                                    role: result.role
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
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
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
                        userId: user[0]._id,
                        role: user[0].role 
                    }, process.env.JWT_KEY,
                        { expiresIn: '1h' },
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        role: user[0].role
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


router.put('/ubdate_user', checkAuth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // الحصول على userId من التوكين (يتم تمريره عبر checkAuth middleware)
    const userId = req.userData.userId;
    const { firstName, lastName, oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // التحقق من كلمة المرور القديمة إذا كانت كلمة مرور جديدة قد تم تقديمها
        if (newPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Old password is incorrect' });
            }
        }

        let hashedPassword;
        if (newPassword) {
            hashedPassword = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName,
                lastName,
                ...(newPassword && { password: hashedPassword })  // تحديث كلمة المرور إذا تم تقديمها فقط
            },
            { new: true }  
        );

        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});


router.delete('/:userId',checkAuth,checkAdmin, (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
        .then(() => {
            res.status(200).json({ message: 'User deleted' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete user' });
        });
});




router.get('/allusers', checkAuth,checkAdmin, async (req, res) => {
    try {
      
        const users = await User.find({}, 'firstName lastName email'); 

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});



module.exports = router;

