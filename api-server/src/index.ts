import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import https from 'https';
import nocache from 'nocache';

import validateAccessToken from './middleware/auth0.middleware';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/not-found.middleware';
import router from './routes/routes';

async function main() {
    if (process.env.NODE_ENV != 'production') {
        dotenv.config();
    }

    const app = express();

    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;
    const host = process.env.HOST ?? 'localhost';

    app.use(express.json());
    app.set('json spaces', 2);

    app.use(
        helmet({
            hsts: {
                maxAge: 31536000,
            },
            contentSecurityPolicy: {
                useDefaults: false,
                directives: {
                    'default-src': ["'none'"],
                    'frame-ancestors': ["'none'"],
                },
            },
            frameguard: {
                action: 'deny',
            },
        })
    );

    app.use((req, res, next) => {
        res.contentType('application/json; charset=utf-8');
        next();
    });

    app.use(nocache());

    app.use(
        cors({
            origin: CLIENT_ORIGIN_URL,
            allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        })
    );

    app.use(validateAccessToken);

    app.use('/', router);

    app.use(errorHandler);
    app.use(notFoundHandler);

    let credentials = {};

    if (process.env.NODE_ENV == 'local') {
        const key = fs.readFileSync(__dirname + '/../.cert/key.pem');
        const cert = fs.readFileSync(__dirname + '/../.cert/cert.pem');

        credentials = { key: key, cert: cert };
        const httpsServer = https.createServer(credentials, app);
        httpsServer.listen(PORT, host, () => {
            console.log(
                `⚡️[server]: Server is running at ${host}:${PORT}, in ${process.env.NODE_ENV} mode, accepting requests from ${CLIENT_ORIGIN_URL}`
            );
            console.log(httpsServer.address());
        });
    } else {
        app.listen(PORT, host, () => {
            console.log(
                `⚡️[server]: Server is running at ${host}:${PORT}, in ${process.env.NODE_ENV} mode, accepting requests from ${CLIENT_ORIGIN_URL}`
            );
        });
    }
}

main();
