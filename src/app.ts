import 'reflect-metadata';

import { Application } from 'express';
import { Server } from 'http';
import { Container } from 'typedi';
import { useContainer as ormUseContainer } from 'typeorm';

import {
    createExpressServer,
    useContainer,
} from 'routing-controllers';

import {
    createConnection,
    Connection
} from 'typeorm';

import { BdConfig } from './environment';
import { InvoiceController } from './controller';

class App {
    public express: Application;
    public server: Server;
    public port = process.env.PORT || 3000;
    public connection: Connection;

    constructor() {
        this.injection();
        this.createConnection();
        this.express = createExpressServer({
            controllers: this.controllers()
        });
        this.server = this.express.listen(this.port);
    }

    private createConnection() {
        createConnection(BdConfig).then(async connection => {
            console.log('Connected to DB');
            this.connection = connection;
        }).catch(error => console.log(`TypeORM connection error: ${error}`));
    }

    private injection(): void {
        useContainer(Container);
        ormUseContainer(Container);
    }

    private middleware(): Array<Function> {
        return [];
    }

    private controllers(): Array<Function> {
        return [InvoiceController];
    }
}

export default new App();
