// spinning express application for handling requests
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyPareser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');



// const productRoutes = require('./api/routes/products');
// const orderRoutes = require('./api/routes/orders');
const userRoutes= require('./api/routes/users');
const mongoURI = 'mongodb://localhost:27017/';  

mongoose.connect(mongoURI);

app.use(morgan('dev'));//حتى تصولني الشغلات يلي عم اعملا يكوست
app.use(bodyPareser.urlencoded({ extended: false }))
app.use(bodyPareser.json());//تجعل قرائة داتا الجسون سهلة
app.use((req, res, next) => {
    res.header('Acccess-Control-Allow-Origin', '*');
    res.header('Acccess-Control-Allow-Headers', '*');[]
    if (req.method === 'OPTIONS') {
        res.header('Acccess-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
        return res.status(200).json({});
    };
    next();//حتى لا اعمل بلوك للركوست تبعي
});

app.post('/predict', async (req, res, next) => {
    try {
        const response = await axios.post('http://0.0.0.0:3000/predict', req.body);
        res.status(200).json(response.data);
    } catch (error) {
        next(error);
    }
});


// //Routes which should handle requests 
// app.use('/products', productRoutes);//اي شي فيو بروداكست رح يتحول لهون 
// app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');//في حال ما لقى بيلي فوق بنزل لهون 
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {//handle all errors
    res.status(error.status || 500);
    res.json(
        {
            error: {
                message: error.message
            }
        }
    )
})
module.exports = app;


