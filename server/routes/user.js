const express = require('express');
const router = express.Router();
const db = require('../queryDB');


// GET logged in user Ex endpoint: http://localhost:5000/user/current
router.get('/current', db.getCurrentUser);

// GET all users Ex endpoint: http://localhost:5000/user/users
router.get('/users', db.getUsers);

// GET user favorites, Ex endpoint: http://localhost:5000/user/favs/Jordan
router.get('/favs/:user', db.getUserFavorites);

// POST create new user,
router.post('/adduser', db.createUser);

// POST log user in,
router.post('/login', db.logUserIn);

// POST log user in,
router.post('/favs/add', db.addFavorite);

module.exports = router;