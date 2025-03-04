const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// Database connection
mongoose.connect('mongodb://localhost:27017/notes-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Models
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
});
const NoteSchema = new mongoose.Schema({
    title: String,
    content: String,
    userId: String,
});
const User = mongoose.model('User', UserSchema);
const Note = mongoose.model('Note', NoteSchema);

// Routes
app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ username: req.body.username, password: hashedPassword });
    try {
        await user.save();
        res.redirect('/login.html');
    } catch {
        res.status(400).send('User already exists');
    }
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/notes.html');
});

app.get('/notes', authenticate, async (req, res) => {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
});

app.post('/notes', authenticate, async (req, res) => {
    const note = new Note({ title: req.body.title, content: req.body.content, userId: req.user.id });
    await note.save();
    res.redirect('/notes.html');
});
app.delete('/notes/:id', authenticate, async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.send('Note deleted successfully');
    } catch (err) {
        res.status(500).send('Failed to delete note');
    }
});


// Authentication middleware
function authenticate(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).send('Access denied');
    
    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded;
        next();
    } catch {
        res.status(400).send('Invalid token');
    }
}

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
