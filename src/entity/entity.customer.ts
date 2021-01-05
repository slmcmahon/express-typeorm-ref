import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from '.';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn() id: number;
    @Column() name: string;
    @Column() street: string;
    @Column() city: string;
    @Column() state: string;
    @Column() postalCode: string;
    @Column() phone: string;
    @Column() contactName: string;
    @OneToMany(() => Invoice, invoice => invoice.customer)
    invoices: Invoice[];
}
