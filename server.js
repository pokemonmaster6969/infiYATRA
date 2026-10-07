import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'db.json');

// Helper to read DB
const readDB = () => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(data);
        return {
            trips: parsed.trips || [],
            heroSlides: parsed.heroSlides || [],
            customTrips: parsed.customTrips || []
        };
    } catch (error) {
        return { trips: [], heroSlides: [], customTrips: [] };
    }
};

// Helper to write DB
const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Initialize DB if empty
if (!fs.existsSync(DB_FILE)) {
    writeDB({ trips: [], heroSlides: [], customTrips: [] });
}

// REST Routes for Trips
app.get('/api/trips', (req, res) => {
    const db = readDB();
    res.json(db.trips);
});

app.get('/api/trips/:id', (req, res) => {
    const db = readDB();
    const trip = db.trips.find(t => t.id === parseInt(req.params.id));
    if (trip) res.json(trip);
    else res.status(404).json({ message: 'Not found' });
});

app.post('/api/trips', (req, res) => {
    const db = readDB();
    const newTrip = { ...req.body, id: Math.max(0, ...db.trips.map(t => t.id)) + 1 };
    db.trips.push(newTrip);
    writeDB(db);
    res.json(newTrip);
});

app.put('/api/trips/:id', (req, res) => {
    const db = readDB();
    const index = db.trips.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
        db.trips[index] = { ...db.trips[index], ...req.body };
        writeDB(db);
        res.json(db.trips[index]);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

app.delete('/api/trips/:id', (req, res) => {
    const db = readDB();
    db.trips = db.trips.filter(t => t.id !== parseInt(req.params.id));
    writeDB(db);
    res.json({ success: true });
});

// REST Routes for Hero Slides
app.get('/api/heroSlides', (req, res) => {
    const db = readDB();
    res.json(db.heroSlides);
});

app.post('/api/heroSlides', (req, res) => {
    const db = readDB();
    db.heroSlides = req.body;
    writeDB(db);
    res.json({ success: true });
});

// REST Routes for Custom Trips
app.get('/api/custom-trips', (req, res) => {
    const db = readDB();
    res.json(db.customTrips || []);
});

app.post('/api/custom-trips', (req, res) => {
    const db = readDB();
    if (!db.customTrips) db.customTrips = [];
    const newInquiry = { 
        ...req.body, 
        id: Date.now(), 
        createdAt: req.body.createdAt || new Date().toISOString() 
    };
    db.customTrips.unshift(newInquiry);
    writeDB(db);
    res.json(newInquiry);
});

app.delete('/api/custom-trips/:id', (req, res) => {
    const db = readDB();
    if (db.customTrips) {
        db.customTrips = db.customTrips.filter(item => item.id !== parseInt(req.params.id));
        writeDB(db);
    }
    res.json({ success: true });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend Server API running on http://localhost:${PORT}`);
});

