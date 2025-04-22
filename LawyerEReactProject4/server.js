const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://eli3601:dXdhiNXYc4WCjI4N@cluster0.vbdtu.mongodb.net/memoryGameScores?retryWrites=true&w=majority&appName=Cluster0', {
	family: 4
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

const scoreSchema = new mongoose.Schema({
    player: String,
    time: Number,
    mistakes: Number,
});

const Score = mongoose.model('Score', scoreSchema);

app.get('/api/scores', async (req, res) => {
    try {
        const scores = await Score.find();
        res.json(scores);
    } catch (err) {
        res.status(500).send("Error fetching scores");
    }
});

app.post('/api/scores', async (req, res) => {
    try {
        const { player, time, mistakes } = req.body;
        const newScore = new Score({ player, time, mistakes });
        await newScore.save();
        res.status(201).send("Score added");
    } catch (err) {
        res.status(500).send("Error saving score");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
