const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger'); 

const router = express.Router();

// Endpoint to get logs
router.get('/', (req, res) => {
  try {
    const logFilePath = path.join(__dirname, './../combined.log');
    const logs = fs.readFileSync(logFilePath, 'utf8');
    const logsArray = logs.split('\n').filter((log) => log.trim() !== '').map((log) => JSON.parse(log));
    // const parsedLogs = logsArray.map((log) => JSON.parse(log));
    res.status(200).json({ logs: logsArray });
  } catch (error) {
    logger.error(`Error retrieving logs: ${error.message}`);
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
