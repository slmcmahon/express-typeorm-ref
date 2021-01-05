import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Invoice, Customer } from '../entity';
import { InvoiceRepository } from '../repository';

@Service()
export class InvoiceService {
    @OrmRepository()
    private readonly invoiceRepository: InvoiceRepository;

    async findAll(): Promise<Invoice[]> {
        return await this.invoiceRepository.allInvoices();
    }

    async findById(id: number): Promise<Invoice> {
        return await this.invoiceRepository.findOneInvoice(id);
    }

    async create(invoice: Invoice, customer: Customer): Promise<number> {
        return await this.invoiceRepository.createAndSave(invoice, customer);
    }

    async update(id: number, invoice: Invoice): Promise<number> {
        return await this.invoiceRepository.updateInvoice(id, invoice);
    }

    async delete(invoice: number | Invoice) {
        await this.invoiceRepository.delete(invoice);
    }
}
