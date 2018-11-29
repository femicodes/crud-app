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
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('employee/add', {
                viewTitle: "Update Employee",
                employee: doc
            })
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        } else {
            console.log('Error in deleting employee: ' + err);
        }
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
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

let updateRecord = (req, res) => {
    Employee.findOneAndUpdate({ _id: req.body._id}, req.body, { new: true }, (err, doc) => {
        if (!err) { 
            res.redirect('employee/list');
         } else if (err.name == 'ValidationError') {
             handleValidationError(err, req.body);
             res.render('employee/add', {
                 viewTitle: 'Update Employee',
                 employee: req.body
             });
         } 
         else {
             console.log('Error during record update: ' + err);
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