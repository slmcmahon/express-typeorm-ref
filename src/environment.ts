import { ConnectionOptions } from 'typeorm';
import { Customer, Invoice, InvoiceItem } from './entity';

export let BdConfig: ConnectionOptions = {
    type: 'mssql',
    database: 'typeormdemo',
    host: 'localhost',
    username: 'typeormuser',
    password: 'Qcijb-fe4k-vD6Bo9deYOw',
    port: 1433,
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: [Customer, Invoice, InvoiceItem]
};
