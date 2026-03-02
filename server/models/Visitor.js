const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    name: { type: String, default: 'portfolio_visits' },
    count: { type: Number, default: 0 }
});

module.exports = mongoose.model('Visitor', visitorSchema);
