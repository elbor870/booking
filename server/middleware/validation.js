function validateCalculate(req, res, next) {
    const { lessonsCount, duration, tariff } = req.body;
    if (typeof lessonsCount !== 'number' || lessonsCount < 1) {
        return res.status(400).json({ error: 'lessonsCount должен быть числом ≥ 1' });
    }
    if (![45, 60, 90].includes(duration)) {
        return res.status(400).json({ error: 'duration должен быть 45, 60 или 90' });
    }
    if (typeof tariff !== 'number' || tariff <= 0) {
        return res.status(400).json({ error: 'tariff должен быть положительным' });
    }
    next();
}

module.exports = {
    validateCourse,       
    validateBooking,      
    validateCalculate,    
};
