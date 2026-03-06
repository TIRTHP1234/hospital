import express from 'express';
import cors from 'cors';
import twilio from 'twilio';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from the root .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Only initialize if we have credentials
const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

// Keep track of sent alerts to prevent spam (in memory for demo purposes)
const recentAlerts = new Map<string, number>();

app.post('/api/alert', async (req, res) => {
    const { message } = req.body;

    if (!client) {
        return res.status(500).json({ success: false, error: 'Twilio credentials not configured' });
    }

    if (!message) {
        return res.status(400).json({ success: false, error: 'Message is required' });
    }

    // Rate limiting: Only send the same alert once every 5 minutes
    const now = Date.now();
    const lastSent = recentAlerts.get(message);
    if (lastSent && now - lastSent < 5 * 60 * 1000) {
        return res.status(429).json({ success: false, error: 'Alert already sent recently. Rate limited.' });
    }

    try {
        const twilioMessage = await client.messages.create({
            body: `🏥 HOSPITAL ALERT: ${message}`,
            from: "+12762939097",   // Twilio number from user context
            to: "+919924681662"        // Hospital department phone from user context
        });

        console.log(`Alert sent: ${twilioMessage.sid}`);
        console.log("Sending SMS:", message);
        recentAlerts.set(message, now);

        res.status(200).json({ success: true, sid: twilioMessage.sid });
    } catch (error) {
        console.error("Twilio error:", error);
        res.status(500).json({ success: false, error: String(error) });
    }
});

// Serve the frontend build
app.use(express.static(join(__dirname, '../dist')));

// Fallback for React Router SPA
app.use((req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || process.env.ALERT_SERVER_PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
