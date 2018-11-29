const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../models/Employee');

router.get('/', (req, res) => {
    res.render('employee/addOrEdit', {
        viewTitle: 'Insert Employee'
    });
});

router.get('/list', (req, res) => {
    res.json('from list');
});

router.post('/', (req, res) => {
    insertRecord(req, res);
});

let insertRecord = (req, res) => {
      let employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.email = req.body.email;
    employee.save((err, doc) => {
        if (!err) {
            res.redirect('employee/list');
        } else {
            console.log('Error during record insertion: ' + err);
        }
    });
}

module.exports = router;