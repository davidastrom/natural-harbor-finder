import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import https from 'https';

import dbSetup from './config/db.config';
import router from './routes/routes';

async function main() {
    if (process.env.NODE_ENV != 'production') {
        dotenv.config();
    }
    const key = fs.readFileSync(__dirname + '/../ssl/selfsigned.key');
    const cert = fs.readFileSync(__dirname + '/../ssl/selfsigned.crt');

    const credentials = { key: key, cert: cert };

    const app = express();
    await dbSetup(process.env.MONGODB_CONNECTION_STRING ?? '');

    const PORT = 3000;

    app.use(cors({ origin: '*' }));
    app.use(express.json());

    app.use('/', router);

    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(PORT, () => {
        console.log(
            `⚡️[server]: Server is running at https://localhost:${PORT}`
        );
    });
}

main();
