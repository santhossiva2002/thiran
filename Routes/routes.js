const express = require('express');
const router = express.Router();
const eventController = require('../Controllers/EventController');
const signup_loginController = require('../Controllers/SignupLoginController');
const registrationController = require('../Controllers/RegistrationController');

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/events', eventController.describeEvent)

router.get('/login', signup_loginController.renderLogin)

router.post('/login', signup_loginController.login)

router.post('/signup', signup_loginController.signup)

router.get('/session_check', signup_loginController.session_check)

router.post('/register', eventController.registerEvent)

router.post('/register_event', registrationController.registerEvent)

// Route to check registration status before registering the user
router.get('/check_registration', registrationController.checkRegistration);

router.get('/check_student', registrationController.check_student)

router.post('/logout', signup_loginController.logout);

router.get('/getUserEmail', signup_loginController.getUser)

router.delete('/deleteUserevent', registrationController.deleteUserevent)

router.get('/getUserEvents', registrationController.getUserEvents)

module.exports = router;
