export interface InvoiceMessage {
    customerInvoiceNumber: string;
    invoicedOn: string;
    due: string;
    total: number;
    balance: number;
    customerId: number;
}