var mongoose = require('mongoose');

var ContactModel = mongoose.model('contact', {
    name: String,
    email: {
        type: String,
        unique: true
    }
}); // this will show up on the DB as contacts

module.exports = ContactModel;

