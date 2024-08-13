const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');





router.post('/predict', (req, res) => {
    // استخرج inputTexts من الطلب
    const inputTexts = req.body.inputTexts;

    // تحقق من أن inputTexts موجودة
    if (!inputTexts || !Array.isArray(inputTexts)) {
        return res.status(400).json({ error: 'Data is required' });
    }

    // هنا يمكنك معالجة البيانات كما تحتاج
    console.log('Received inputTexts:', inputTexts);
    
    // إرسال البيانات إلى خدمة أخرى (يمكنك إزالة هذا الجزء إذا لم يكن ضرورياً هنا)
    axios.post('http://0.0.0.0:3000/predict', inputTexts)
        .then(response => {
            console.log('Response from external service:', response.data);
            res.status(200).json({ message: 'Data received successfully', inputTexts });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Error processing the request' });
        });
});


module.exports = router;

//
// {
//     "inputTexts": [
//         {
//             "id": "1",  // يمكنك استخدام قيمة معرف فريدة أو تركها وإدارتها في الخادم
//             "text": "كريم"
//         },
//         {
//             "id": "2",
//             "text": "قلاش"
//         }
//     ]
// }


///
