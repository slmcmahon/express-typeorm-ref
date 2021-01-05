import { EntityRepository, Repository } from 'typeorm';
import { Invoice, InvoiceItem } from '../entity';

@EntityRepository(InvoiceItem)
export class InvoiceItemRepository extends Repository<InvoiceItem> {

    static isInvoiceItem(invoiceItem: any): invoiceItem is InvoiceItem {
        return typeof invoiceItem === 'object'
            && typeof invoiceItem.quantity === 'number'
            && typeof invoiceItem.price === 'number'
            && typeof invoiceItem.description === 'string';
    }

    static isInvoiceItemUpdater(updater: any): boolean {
        let ret = true;

        if (typeof updater !== 'object') {
            throw new Error('isInvoiceItemUpdater must receive an object');
        }

        if (typeof updater.quantity !== 'undefined') {
            if (typeof updater.quantity !== 'number') {
                ret = false;
            }
        }

        if (typeof updater.price !== 'undefined') {
            if (typeof updater.price !== 'number') {
                ret = false;
            }
        }

        if (typeof updater.description !== 'undefined') {
            if (typeof updater.description !== 'string') {
                ret = false;
            }
        }

        return ret;
    }

    async createAndSave(invoiceItem: InvoiceItem, invoice: Invoice): Promise<number> {
        const invItem = new InvoiceItem();
        invItem.description = invoiceItem.description;
        invItem.price = invoiceItem.price;
        invItem.quantity = invoiceItem.quantity;
        invItem.invoice = invoice;

        await this.save(invItem);
        return invItem.id;
    }

    async updateInvoiceItem(id: number, invoiceItem: InvoiceItem): Promise<number> {
        if (!InvoiceItemRepository.isInvoiceItemUpdater(invoiceItem)) {
            throw new Error(`InvoiceItem update id ${id} did not recieve a InvoiceItem updater.`);
        }

        await this.manager.update(InvoiceItem, id, invoiceItem);
        return id;
    }

    async deleteInvoiceItem(invoiceItem: number | InvoiceItem) {
        if (typeof invoiceItem !== 'number' && !InvoiceItemRepository.isInvoiceItem(invoiceItem)) {
            throw new Error('Supplied invoiceItem object is not a InvoiceItem.');
        }

        await this.manager.delete(InvoiceItem, typeof invoiceItem === 'number' ? invoiceItem : invoiceItem.id);
    }
}
