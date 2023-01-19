const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const secret = 'mysecretkey';
//const cookieParser = require("cookie-parser");
const sessions = require('express-session');

var db = require('./database.js');

const app = express();

app.use(express.json());
app.use(cors());

const oneDay = 1000 * 60 * 60 * 1;
app.use(sessions({
    secret: secret,
    saveUninitialized:true,
    cookie: { maxAge: 600000 },
    resave: false 
}));

// Sample API endpoint that requires authentication
app.get('/secret', authenticateToken, (req, res) => {
    res.json({
        message: 'This is a secret message'
    });
});

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Login endpoint
app.post('/login', (req, res) => {
    // Authenticate user and get token
    const user = authenticate(req.body.username);
    if (!user) return res.status(400).send('Invalid credentials');

    // Create and assign token
    const token = jwt.sign({ id: user.id }, secret);
    res.json({ token });
    db.Insert_connections(req.body.username, token)
});

// Dummy function to authenticate user
function authenticate() {

    return { id: 1 };
}

app.listen(3000, () => console.log('Server started'));
