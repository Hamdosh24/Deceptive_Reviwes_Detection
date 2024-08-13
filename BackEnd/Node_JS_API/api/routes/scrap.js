const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();

const scraperName = 'welcomesaudi'; 
const url = 'https://welcomesaudi.com/hotel/hilton-riyadh-hotel-and-residences';
const fileName = 'items3';

async function runScraper() {
    try {
        const response = await axios.post(`http://0.0.0.0:3000/scrap/${scraperName}`, {
            url,
            file_name: fileName
        });

        console.log('Response from Flask API:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error calling Flask API:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

// runScraper();

module.exports = router;








