require('./models/db');
const express = require('express');
const employeeController = require('./controllers/employeeController');
const path = require('path');
const exphbs = require('express-handlebars');

let app = express();

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'hbs');

app.use('/employee', employeeController);

app.listen(1738, () => {
    console.log('server started on port fetty wap lmao!');
});