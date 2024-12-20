const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./backend/crud')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const port = 3000

//middleware body-parser & json tokens
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
//tokens
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract token

    if (!token) return res.status(401).json({ error: 'Token is required' });

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user; // Attach user info to request object
        next();
    });
};
//for validate token after sign in
app.post('/validate-token', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token is required' });

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        res.status(200).json({ message: 'Token is valid', user });
    });
});

//to serve file paths
const path = require('path');
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/1_signup.html'));
});
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/2_signin.html'));
});
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/3_dashboard.html'));
});


// signin POST
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // query db
        const result = await db.pool.query('SELECT * FROM users WHERE email = $1', [email]);
        console.log('User query result:', result.rows);

        if (result.rows.length === 0) {
            //not found?
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];

        // compare password input with hashed pw in db
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            // !match
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, namefirst: user.namefirst, email: user.email },
            'your_secret_key',
            { expiresIn: '1h' }
        );

        // respond with the token
        res.status(200).json({
            message: 'Signed in successfully', token,
            user: {
                id: user.id,
                nameFirst: user.namefirst,
                email: user.email,
            }
        });
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).send('Internal Server Error');
    }
});


//CRUD ops 
app.get('/', db.getUsers);
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})