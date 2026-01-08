const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json()); // Support JSON-encoded bodies (Postman)
app.use(express.urlencoded({ extended: true })); 

app.use(session({
    secret: 'your-very-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
}));

const users = []; 

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).json({ message: "Unauthorized: Please login" });
    } else {
        next();
    }
};

// --- API ROUTES ---

app.get('/', (req, res) => {
    res.json({ message: "Welcome", userId: req.session.userId || "Not logged in" });
});

app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
        id: Date.now(),
        email: req.body.email,
        password: hashedPassword
    };
    users.push(newUser);
    res.status(201).json({ message: "User registered", email: newUser.email });
});

app.post('/login', async (req, res) => {
    const user = users.find(u => u.email === req.body.email);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        req.session.userId = user.id;
        return res.json({ message: "Logged in successfully", session: req.session });
    }
    res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/dashboard', redirectLogin, (req, res) => {
    res.json({ message: "Welcome to the dashboard", userId: req.session.userId });
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.clearCookie('connect.sid'); // Default express-session cookie name
        res.json({ message: "Logged out successfully" });
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));