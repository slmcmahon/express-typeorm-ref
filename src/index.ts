import 'reflect-metadata'; // this shim is required
import { useExpressServer } from 'routing-controllers';
import express from 'express';
import * as bodyParser from 'body-parser';

import { IndexController } from './controller';
import { createConnection } from 'typeorm';

// Express Server
const port = process.env.PORT || 1337;
const app = express();

// Setup for Production Environment
if (process.env.ENV !== 'development') {
    app.set('trust proxy', true);
    app.disabled('x-powered-by');
}

createConnection().then(con => {
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    app.use(bodyParser.json());

    useExpressServer(app, {
        errorOverridingMap: {
            ForbiddenError: {
                mesage: 'Access is denied'
            }
        },
        controllers: [IndexController]
    });

    app.listen(port, () => {
        console.log({
            level: 'info',
            message: `Server: Server running on: ${port}`
        });
    });
});
