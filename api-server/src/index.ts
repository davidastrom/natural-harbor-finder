import express from 'express';
import fs from 'fs';
import https from 'https';

import dbSetup from './db/db-setup';
import router from './routes/routes';

async function main() {
    const key = fs.readFileSync(__dirname + '/../ssl/selfsigned.key');
    const cert = fs.readFileSync(__dirname + '/../ssl/selfsigned.crt');

    const credentials = { key: key, cert: cert };

    const app = express();
    await dbSetup();

    const PORT = 3000;

    app.use('/', router);

    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(PORT, () => {
        console.log(
            `⚡️[server]: Server is running at https://localhost:${PORT}`
        );
    });
}

main();
