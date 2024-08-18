const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');

const Prediction = require('../models/Prediction'); // قم بتعديل المسار حسب الحاجة

router.post('/', async (req, res) => {
    const inputTexts = req.body.inputTexts;

    // تحقق من أن inputTexts موجودة
    if (!inputTexts || !Array.isArray(inputTexts)) {
        return res.status(400).json({ error: 'Data is required' });
    }

    // تحويل كل نص في inputTexts إلى كائن يحتوي على مفتاح 'text'
    const formattedInputTexts = inputTexts.map(text => ({ text }));

    console.log('Formatted inputTexts:', formattedInputTexts);
    
    try {
        // إرسال البيانات إلى خدمة Flask
        const response = await axios.post('http://0.0.0.0:3000/predict', { inputTexts: formattedInputTexts });
        console.log('Response from external service:', response.data);

        // تخزين البيانات في MongoDB
        const newPrediction = new Prediction({
            inputTexts: inputTexts,
            labels: response.data.map(item => item.label) // استخراج التصنيفات من الاستجابة
        });

        await newPrediction.save(); // حفظ السجل في MongoDB

        // إعداد البيانات لإرسالها في الاستجابة
        const reviewsWithDetails = response.data.map((item, index) => ({
            text: item.text,
            label: item.label,
            pred_vec: item.pred_vec,
            polarity: item.polarity
        }));

        // إرسال البيانات المستلمة من Flask كاستجابة للعميل
        res.status(200).json({
            message: 'Data received and stored successfully',
            reviewsWithDetails
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error processing the request' });
    }
});


module.exports = router;


//http://0.0.0.0:3000/predict

// {
//     "inputTexts": [
//         "كريم قلاش",
//         "النص الثاني",
//         "النص الثالث"
//     ]
// }

//






