// signupLoginController.js

const Counter = require('../Models/Counter');
const Registration = require('../Models/Registration')
const Student = require('../Models/Student')

// Function to check if the user is already registered for an event
exports.checkRegistration = async (req, res) => {
    const userEmail = req.session.Student.email; // Assuming the email is stored in the session
    const { event_name } = req.query;

    // Validate request
    if (!userEmail || !event_name) {
        return res.status(400).json({ error: 'Invalid request. Please provide user email and event name.' });
    }

    try {
        const isRegistered = await Registration.findOne({ event_name: event_name, participants: userEmail });
        if (isRegistered) {
            res.status(200).json({ message: 'Participant already registered' });
        }
        else{
            res.status(200).json({ message: 'Participant not registered' });
        }

    } catch (error) {
        console.error('Error checking registration status:', error);
        res.status(500).json({ error: 'An error occurred while checking registration status.' });
    }
};

// Function to register for an event
exports.registerEvent = async (req, res) => {
    const userEmail = req.session.Student.email; // Assuming the email is stored in the session
    const { event_name, participantEmails } = req.body;
    participantEmails.push(userEmail)
    

    if (!userEmail || !event_name || !participantEmails || !Array.isArray(participantEmails)) {
        return res.status(400).json({ error: 'Invalid request. Please provide user email, event name, and participant emails array.' });
    }

    try {
        // Create a new Participant document

        const registrationId = await getNextRegistrationId();
        const newRegistration = new Registration({
            _id: registrationId,
            event_name: event_name,
            participants: participantEmails
        });

        // Save the Participant document to the database
        await newRegistration.save();
        console.log(newRegistration)
        
        // Response if registration is successful
        res.json({ message: 'Registration successful!' });
    } catch (error) {
        console.error('Error registering participants:', error);
        res.status(500).json({ error: 'An error occurred while registering participants.' });
    }
};

async function getNextRegistrationId() {
    try {
        const counter = await Counter.findOneAndUpdate(
            { _id: "registration_id" },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );
        return counter.sequence_value;
    } catch (error) {
        console.error('Error getting next registration ID:', error);
        throw error;
    }
}


exports.check_student = async (req, res) => {
    try {
        const { email } = req.query;
        // Check if the email exists in the student collection
        const existingStudent = await Student.findOne({ email });

        // If the student exists, return exists: true
        if (existingStudent) {
            res.status(200).json({ exists: true });
        } else {
            // If the student does not exist, return exists: false
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking student email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};