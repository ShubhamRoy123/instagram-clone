const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// --- GET : SHOW REGISTER PAGE ---
router.get('/register', (req, res) => {
	res.render('register');
});

// --- POST: Handle Registration ---
router.post('/register', async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			username,
			email,
			password: hashedPassword
		});

		await newUser.save();
		res.redirect('/login');
	}catch(err){
		res.status(500).send("Error creating account:" + err.message);
	}
});

// --- GET: Show Login Page ---
router.get('/login', (req, res) => {
	res.render('login');
});

// --- POST: Handle Login ---
router.post('/login' async (req, res) => {
	const {email, password}=req.body;
	const foundUser = await User.findOne({ email });

	if (foundUser && await bcrypt.compare(password, foundUser.password)) {
		req.session.userId = foundUser._id;
		return res.redirect('/dashboard');
	}
	res.send('Invalid email or password');
});

module.exports = router;