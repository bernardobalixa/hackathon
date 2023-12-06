import express from 'express';
import dotenv from 'dotenv';
import {CommaSeparatedListOutputParser} from 'langchain/output_parsers';

dotenv.config();

const router = express.Router();


router.post("/abc", (req, res) => {
    
});

export default router;