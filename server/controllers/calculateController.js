const fs = require('fs');
const path = require('path');

const BASE_PRICE_PER_MINUTE = 30;
const LOG_PATH = path.join(__dirname, '..', 'data', 'calculations.log');

function logCalculation(message) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ${message}\n`;
    fs.appendFile(LOG_PATH, line, (err) => {
        if (err) console.error('Ошибка лога:', err);
    });
}

function calculate(req, res) {
    const { lessonsCount, duration, tariff } = req.body;
    const total = Math.round(BASE_PRICE_PER_MINUTE * duration * lessonsCount * tariff);

    logCalculation(`OK: ${lessonsCount} зан., ${duration} мин, тариф ${tariff} → ${total} ₽`);

    res.json({
        total,
        breakdown: { basePricePerMinute: BASE_PRICE_PER_MINUTE, duration, lessonsCount, tariff },
    });
}

module.exports = { calculate };
