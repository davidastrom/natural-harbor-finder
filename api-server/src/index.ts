import express from 'express';
import fs from 'fs';
import https from 'https';

import connectDb from './db/db.connect';
import router from './routes/routes';

const key = fs.readFileSync(__dirname + '/../ssl/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/../ssl/selfsigned.crt');

const credentials = { key: key, cert: cert };

const app = express();
connectDb();

const PORT = 3000;

app.use('/', router);

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
