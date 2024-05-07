const express = require('express');
const router = express.Router();
const AuthService = require('../service/authService');
const passport = require('passport');

router.post('/register', async (req, res) => {
    const data = req.body;
    try {
        const newUser = await AuthService.register(data);
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.post('/login', passport.authenticate("local"), async (req, res) => {
    try {
        const { username, password } = req.body;
        const loginUser = await AuthService.login({ username, password });
        res.status(200).send(loginUser);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
