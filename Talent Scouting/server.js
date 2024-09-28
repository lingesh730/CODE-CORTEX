const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Define User Schema and Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    userType: String, // Athlete, Coach, or Organization
    dob: Date,
    age: Number,
    place: String,
    sports: [String], // Array of sports for athletes/coaches
    achievements: [String],
    team: String,      // For athletes
    coach: String,     // For athletes and organizations
    notableTeams: [String], // For coaches
    notablePlayers: [String],
    facilities: [String], // For organizations
});

const User = mongoose.model('User', userSchema);

// Route to register a new user
app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send('User registered successfully!');
    } catch (error) {
        res.status(500).send('Error registering user: ' + error.message);
    }
});

// Route to retrieve all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error retrieving users: ' + error.message);
    }
});

// Route to retrieve a user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Error retrieving user: ' + error.message);
    }
});

// Route to update user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Returns the updated document
        });
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send('Error updating user: ' + error.message);
    }
});

// Route to delete user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting user: ' + error.message);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // You would normally save this data to MongoDB
    console.log(`User Registered: ${name}, ${email}`);

    // Send a response back to the frontend
    res.json({
        message: 'User registered successfully',
        user: {
            name,
            email
        }
    });
});
