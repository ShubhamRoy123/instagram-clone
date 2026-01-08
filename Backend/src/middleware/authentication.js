const express = require("express");
const session = require("express-session");
const bcrypt = require('bcrypt');
const app=express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//configure session
app.use(session({
	secret: 'your-very-secret-key',
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 3600000 }
}));

const user = [];

//Middleware to protect routes
const redirectLogin = (req, res, next) => {
	if (!req.session.userId) {
		res.redirect('/login');
	}else{
		next();
	}
};

// --- ROUTES---

app.get('/',(req, res) => {
	res.render('home',{ userId: req.session.userId });
});

//Register
app.post('/register', async (req, res) => {
	const hashedPassword = await bcrypt.hash(req.body.password,10);
	user.push({
		id: Date.now(),
		email: req.body.email,
		password: hashedPassword
	});
	res.redirect('/login');
});

//login
app.post('/login',async(req,res) => {
	const user = users.find(u => u.email === req.body.email);
	if (user && await bcrypt.compare(req.body.password, user.password)) {
		req.session.userId = user.id;
		return res.redirect('/dashboard');
	}
	res.send('Invalid credentials');
});

//Logout
app.post('/logout', (req, res) => {
	req.session.destroy(err => {
		if(err) return res.redirect('/dashboard');
		res.clearCookie('sid');
		res.redirect('/');
	});
});

app.get('/dashboard', redirectLogin, (req, res) => {
	res.render('dashboard');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));