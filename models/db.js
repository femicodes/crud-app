const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/EmployeeDB', {useNewUrlParser: true}, (err) => {
    if (!err) { console.log('Database connection successful') }
    else { console.log('Error in database connection' + err) }
});