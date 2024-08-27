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


router.post('/signup', async (req, res) => {
    try {
   
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

  
        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            role: 'User'
        });


        const savedUser = await user.save();

        const token = jwt.sign({
            userId: savedUser._id,
            role: savedUser.role
        }, process.env.JWT_KEY, { expiresIn: '1h' });

        return res.status(201).json({
            message: 'User created',
            token: token,
            role: savedUser.role
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/login', async (req, res) => {
    try {
  
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Auth failed' });
        }


        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Auth failed' });
        }


        const token = jwt.sign({
            userId: user._id,
            role: user.role
        }, process.env.JWT_KEY, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Auth successful',
            token: token,
            role: user.role
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.put('/ubdate_user', checkAuth, async (req, res) => {
    // التحقق من صحة البيانات المدخلة
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.userData;
    const { firstName, lastName, oldPassword, newPassword, email } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email && email !== user.email) {
            return res.status(400).json({ message: 'Email cannot be changed' });
        }

        if (newPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Old password is incorrect' });
            }

            user.password = await bcrypt.hash(newPassword, 10);
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;

        const updatedUser = await user.save();

        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

router.delete('/:userId', checkAuth, checkAdmin, async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await User.deleteOne({ _id: userId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete user', details: err.message });
    }
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

