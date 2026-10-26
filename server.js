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
            customTrips: parsed.customTrips || [],
            leads: parsed.leads || [],
            corporateTestimonials: parsed.corporateTestimonials || [],
            corporatePhotos: parsed.corporatePhotos || [],
            auditLogs: parsed.auditLogs || [],
            mediaAssets: parsed.mediaAssets || []
        };
    } catch (error) {
        return { trips: [], heroSlides: [], customTrips: [], leads: [], corporateTestimonials: [], corporatePhotos: [], auditLogs: [], mediaAssets: [] };
    }
};

// Helper to write DB
const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Initialize DB if empty
if (!fs.existsSync(DB_FILE)) {
    writeDB({ trips: [], heroSlides: [], customTrips: [], leads: [], corporateTestimonials: [], corporatePhotos: [], auditLogs: [], mediaAssets: [] });
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

// REST Routes for Unified Leads
app.get('/api/leads', (req, res) => {
    const db = readDB();
    res.json(db.leads || []);
});

app.post('/api/leads', (req, res) => {
    const db = readDB();
    if (!db.leads) db.leads = [];
    const newLead = {
        ...req.body,
        id: req.body.id || Date.now(),
        createdAt: req.body.createdAt || new Date().toISOString(),
        status: req.body.status || 'New'
    };
    db.leads.unshift(newLead);
    writeDB(db);
    res.json(newLead);
});

app.put('/api/leads/:id', (req, res) => {
    const db = readDB();
    if (!db.leads) db.leads = [];
    const index = db.leads.findIndex(l => l.id === parseInt(req.params.id));
    if (index !== -1) {
        db.leads[index] = { ...db.leads[index], ...req.body };
        writeDB(db);
        res.json(db.leads[index]);
    } else {
        res.status(404).json({ message: 'Lead not found' });
    }
});

app.delete('/api/leads/:id', (req, res) => {
    const db = readDB();
    if (db.leads) {
        db.leads = db.leads.filter(l => l.id !== parseInt(req.params.id));
        writeDB(db);
    }
    res.json({ success: true });
});

// REST Routes for Corporate Content
app.get('/api/corporate/testimonials', (req, res) => {
    const db = readDB();
    res.json(db.corporateTestimonials || []);
});

app.post('/api/corporate/testimonials', (req, res) => {
    const db = readDB();
    db.corporateTestimonials = req.body;
    writeDB(db);
    res.json({ success: true });
});

app.get('/api/corporate/photos', (req, res) => {
    const db = readDB();
    res.json(db.corporatePhotos || []);
});

app.post('/api/corporate/photos', (req, res) => {
    const db = readDB();
    db.corporatePhotos = req.body;
    writeDB(db);
    res.json({ success: true });
});

// REST Routes for Audit Logs
app.get('/api/audit-logs', (req, res) => {
    const db = readDB();
    res.json(db.auditLogs || []);
});

app.post('/api/audit-logs', (req, res) => {
    const db = readDB();
    if (!db.auditLogs) db.auditLogs = [];
    const logItem = {
        ...req.body,
        id: 'log-' + Date.now(),
        timestamp: req.body.timestamp || new Date().toISOString()
    };
    db.auditLogs.unshift(logItem);
    if (db.auditLogs.length > 200) db.auditLogs.pop();
    writeDB(db);
    res.json(logItem);
});

// REST Routes for Media Assets
app.get('/api/media', (req, res) => {
    const db = readDB();
    res.json(db.mediaAssets || []);
});

app.post('/api/media', (req, res) => {
    const db = readDB();
    if (!db.mediaAssets) db.mediaAssets = [];
    const newAsset = {
        ...req.body,
        id: 'media-' + Date.now(),
        createdAt: new Date().toISOString()
    };
    db.mediaAssets.unshift(newAsset);
    writeDB(db);
    res.json(newAsset);
});

app.delete('/api/media/:id', (req, res) => {
    const db = readDB();
    if (db.mediaAssets) {
        db.mediaAssets = db.mediaAssets.filter(m => m.id !== req.params.id);
        writeDB(db);
    }
    res.json({ success: true });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend Server API running on http://localhost:${PORT}`);
});

