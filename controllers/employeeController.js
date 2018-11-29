const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../models/Employee');

router.get('/', (req, res) => {
    res.render('employee/add', {
        viewTitle: 'Insert Employee'
    });
});

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render('employee/list', {
                list: docs
            });
        } else {
            console.log('Error in retrieving employee list: ' + err);
        }
    });
});

router.get('/:id', (req, res) => {
    
})

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
        } else if (err.name == 'ValidationError') {
            handleValidationError(err, req.body);
            res.render('employee/add', {
                viewTitle: 'Insert Employee',
                employee: req.body
            });
        } else {
            console.log('Error during record insertion: ' + err);
        }
    });
}

let handleValidationError = (err, body) => {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
} 

module.exports = router;