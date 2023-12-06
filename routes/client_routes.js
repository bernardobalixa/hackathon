import express from 'express';
import path from 'path';

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

router.get("/identification", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/identification.html"));
});

router.get("/monitoring", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/monitoring.html"));
});

export default router;