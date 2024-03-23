const express = require('express');
const Student = require('../Models/Student');

exports.renderLogin = async (req, res) => {
    res.render('login_signup')
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    Student.findOne({ email, password })
        .then(Student => {
            if (Student) {
                req.session.Student = Student;
                var name = Student.name
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        })
        .catch(err => {
            console.error('Error finding user:', err);
            res.send('Error finding user');
        });
}

exports.signup = async (req, res) => {
    const { name, email, phone, password, programme,department, year } = req.body;
    const newStudent = new Student({ name, email, phone, password, programme,department, year });
    newStudent.save()
        .then(user => {
            // Redirect to login after signup
            res.redirect('/login');
        })
        .catch(err => {
            console.error('Error creating user:', err);
            res.send('Error creating user');
        });
}

exports.session_check = async (req, res) => {
    if (!req.session.Student)
        res.status(400).send("Session not found");
    else
        res.status(200).send("Session checked successfully");
}
exports.logout = async (req, res) => {
    console.log("hit in controller")
    await req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.send('Error destroying session');
        } else {
            res.clearCookie('connect.sid');
            res.redirect('/login'); // Redirect to login after logout
        }
    });
};

exports.getUser = (req, res) => {

    if (req.session.Student) {
        let temp = req.session.Student.email
        console.log("userEmail", temp)
        res.json({ "data": temp })
    }
    else {
        res.json({ "data": "No user in session" })
    }
}
