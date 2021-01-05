import { EntityRepository, Repository } from 'typeorm';
import { Invoice, Customer } from '../entity';

@EntityRepository(Invoice)
export class InvoiceRepository extends Repository<Invoice> {

    static isInvoice(invoice: any): invoice is Invoice {
        return typeof invoice === 'object'
            && typeof invoice.customerInvNumber === 'string'
            && typeof invoice.invoicedOn === 'object'
            && typeof invoice.due === 'object'
            && typeof invoice.total === 'number'
            && typeof invoice.balance === 'number';
    }

    static isInvoiceUpdater(updater: any): boolean {
        let ret = true;

        if (typeof updater !== 'object') {
            throw new Error('isInvoiceUpdater must receive an object');
        }

        if (typeof updater.customerInNumber !== 'undefined') {
            if (typeof updater.customerInNumber !== 'string') {
                ret = false;
            }
        }

        if (typeof updater.invoicedOn !== 'undefined') {
            if (typeof updater.invoicedOn !== 'object') {
                ret = false;
            }
        }

        if (typeof updater.due !== 'undefined') {
            if (typeof updater.due !== 'object') {
                ret = false;
            }
        }

        if (typeof updater.total !== 'undefined') {
            if (typeof updater.total !== 'number') {
                ret = false;
            }
        }

        if (typeof updater.balance !== 'undefined') {
            if (typeof updater.balance !== 'number') {
                ret = false;
            }
        }

        return ret;
    }

    async createAndSave(invoice: Invoice, customer: Customer): Promise<number> {
        const inv = new Invoice();
        inv.invoicedOn = invoice.invoicedOn;
        inv.due = invoice.due;
        inv.total = invoice.total;
        inv.balance = invoice.balance;
        inv.customerInvNumber = invoice.customerInvNumber;
        inv.customer = customer;

        await this.save(inv);
        return inv.id;
    }

    async allInvoices(): Promise<Invoice[]> {
        const invoices = await this.find({ relations: ['customer', 'items'] });
        return invoices;
    }

    async findOneInvoice(id: number): Promise<Invoice> {
        const invoice = await this.findOne({ where: { id: id }, relations: ['customer', 'items'] });
        if (!InvoiceRepository.isInvoice(invoice)) {
            throw new Error(`No Invoice was found for id: ${id}.`);
        }
        return invoice;
    }

    async updateInvoice(id: number, invoice: Invoice): Promise<number> {
        if (!InvoiceRepository.isInvoiceUpdater(invoice)) {
            throw new Error(`Invoice update id ${id} did not recieve a Invoice updater.`);
        }

        await this.manager.update(Invoice, id, invoice);
        return id;
    }

    async deleteInvoice(invoice: number | Invoice) {
        if (typeof invoice !== 'number' && !InvoiceRepository.isInvoice(invoice)) {
            throw new Error('Supplied invoice object is not a Invoice.');
        }

        await this.manager.delete(Invoice, typeof invoice === 'number' ? invoice : invoice.id);
    }
}
