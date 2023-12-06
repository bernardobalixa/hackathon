import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const router = express.Router();

console.log(process.env.OPENAI_API_KEY);

router.get("/abc", (req, res) => {
    
});


export default router;