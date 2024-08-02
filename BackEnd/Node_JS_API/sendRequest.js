const axios = require('axios');
const inputTexts = [
    { id: 1, text: 'النص الأول للتنبؤ' },
    { id: 2, text: 'النص الثاني للتنبؤ' }
  ];
  
  axios.post('http://localhost:3000/predict', inputTexts)
  .then(response => {
    console.log('Predictions:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
