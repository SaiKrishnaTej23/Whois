var mongoose = require('mongoose');

module.exports = mongoose.model('WhoisLog', {
        domain: String,
        searchedOn: String    
});