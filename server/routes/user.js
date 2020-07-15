const express = require('express');
const router = express.Router();

// GET all users
router.get('/users', (req, res) => res.send('<h1> *TODO: Return all users from db in JSON format </h1>'))

// GET single user 
router.get('/:id', (req, res) => res.send('<h1> *TODO query db for user with id parameter. </h1>'));

module.exports = router;