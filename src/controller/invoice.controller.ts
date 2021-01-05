import {
    JsonController,
    Get, Post, Put, Delete,
    Param,
    Body,
    HttpCode,
    OnUndefined
} from 'routing-controllers';

import {
    IsNotEmpty,
    IsNumber
} from 'class-validator';

import { Invoice } from '../entity';
import { InvoiceService } from '../service';

@JsonController("/api/invoices")
export class InvoiceController {

    constructor(private readonly invoiceService: InvoiceService) { }

    @Get()
    getInvoices() {
        return this.invoiceService.findAll();
    }

    @Get('/:id')
    getOne(@Param("id") id: number) {
        return this.invoiceService.findById(id);
    }

    @Post()
    save(@Body() invoice: Invoice) {
        return this.invoiceService.create(invoice);
    }
}
