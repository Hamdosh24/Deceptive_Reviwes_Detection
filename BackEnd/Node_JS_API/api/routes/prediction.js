const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');

const Prediction = require('../models/Prediction');
const { logUsage } = require('../services/logService'); // تأكد من مسار الملف الصحيح
const checkAuth = require('../middleware/authMiddleware');


router.post('/',checkAuth, async (req, res) => {
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
        const reviewsWithDetails = response.data.map((item, index) => {
            // تحقق من وجود text و label في item
            const text = item.text || 'No text';  // إذا كان item.text غير موجود، سيتم استخدام 'No text'
            const label = item.label || 'No label'; // إذا كان item.label غير موجود، سيتم استخدام 'No label'
        
            logUsage( 'predictionService', text, label); 

            return {
                text: text,
                label: label,
                pred_vec: item.pred_vec || 'No pred_vec',
                polarity: item.polarity || 'No polarity' 
            };
        });
        
        
        
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




// {
//     "inputTexts": [
//         "كريم قلاش",
//         "النص الثاني",
//         "النص الثالث"
//     ]
// }








