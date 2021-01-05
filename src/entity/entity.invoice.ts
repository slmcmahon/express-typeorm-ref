import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer, InvoiceItem } from '.';

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn() id: number;
    @Column() customerInvNumber: string;
    @Column('datetime2') invoicedOn: Date;
    @Column('datetime2') due: Date;
    @Column('decimal') total: number;
    @Column('decimal') balance: number;
    @ManyToOne(() => Customer, customer => customer.invoices)
    customer: Customer;
    @OneToMany(() => InvoiceItem, invoiceItem => invoiceItem.invoice)
    items: InvoiceItem[];
}
