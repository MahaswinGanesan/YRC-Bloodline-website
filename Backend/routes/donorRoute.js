const express = require('express');
const { bloodDonor } = require('../controllers/donorController.js');

const donorRouter = express.Router()

donorRouter.post ('/Donor', bloodDonor);

module.exports = donorRouter;