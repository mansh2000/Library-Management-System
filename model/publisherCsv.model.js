const mongoose = require('mongoose');
const csvSchema = mongoose.Schema({
    Country: {
        type: String
    },
    Name: {
        type: String
    },
    Books: {
        type: String
    },
    OfficialLanguage: {
        type: String
    }
});
const csvModel = mongoose.model('csvModel', csvSchema);
module.exports = csvModel;