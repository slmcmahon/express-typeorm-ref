import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from '.';

@Entity()
export class InvoiceItem {
    @PrimaryGeneratedColumn() id: number;
    @Column('int') quantity: number;
    @Column('decimal') price: number;
    @Column() description: string;
    @ManyToOne(() => Invoice, invoice => invoice.items)
    invoice: Invoice;
}
