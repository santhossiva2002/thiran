const express = require('express');


exports.describeEvent = async (req, res) => {
    const event_name = req.query.variable; // Assuming the event_name is passed as a query parameter
    res.render('event_description', { event_name });
};

exports.registerEvent = async(req, res) => {
    
}