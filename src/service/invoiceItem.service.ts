import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Invoice, InvoiceItem } from '../entity';
import { InvoiceItemRepository } from '../repository';

@Service()
export class InvoiceItemService {
    @OrmRepository()
    private readonly invoiceItemRepository: InvoiceItemRepository;

    async create(invoiceItem: InvoiceItem, invoice: Invoice): Promise<number> {
        return await this.invoiceItemRepository.createAndSave(invoiceItem, invoice);
    }

    async update(id: number, invoiceItem: InvoiceItem): Promise<number> {
        return await this.invoiceItemRepository.updateInvoiceItem(id, invoiceItem);
    }

    async delete(invoiceItem: number | InvoiceItem) {
        await this.invoiceItemRepository.delete(invoiceItem);
    }
}
