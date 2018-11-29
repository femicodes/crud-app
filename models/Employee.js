const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let employeeSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

let Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;