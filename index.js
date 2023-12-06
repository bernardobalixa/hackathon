import express from "express";
import path from "path";
import cors from 'cors';

import clientRouter from './routes/client_routes.js';
import serverRouter from './routes/server_routes.js';

global.__dirname = path.resolve("");

const port = 3030;
const app = express();

app.use(cors());
app.use(express.static("public"));

app.use("/", clientRouter);
app.use("/api", serverRouter);

app.listen(port, () => {
    console.log("App a correr em http://localhost:"+port);
});