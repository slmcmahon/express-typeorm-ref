import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {

    static isCustomer(customer: any): customer is Customer {
        return typeof customer === 'object'
            && typeof customer.name === 'string'
            && typeof customer.street === 'string'
            && typeof customer.city === 'string'
            && typeof customer.state === 'string'
            && typeof customer.postalCode === 'string'
            && typeof customer.phone === 'string'
            && typeof customer.contactName === 'string';
    }

    static isCustomerUpdater(updater: any): boolean {
        let ret = true;

        if (typeof updater !== 'object') {
            throw new Error('isCustomerUpdater must receive an object');
        }

        if (typeof updater.name !== 'undefined') {
            if (typeof updater.name !== 'string') {
                ret = false;
            }
        }

        if (typeof updater.street !== 'undefined') {
            if (typeof updater.street !== 'string') {
                ret = false;
            }
        }

        if (typeof updater.city !== 'undefined') {
            if (typeof updater.city !== 'string') {
                ret = false;
            }
        }

        if (typeof updater.state !== 'undefined') {
            if (typeof updater.state !== 'string') {
                ret = false;
            }
        }

        if (typeof updater.postalCode !== 'undefined') {
            if (typeof updater.postalCode !== 'string') {
                ret = false;
            }
        }

        if (typeof updater.phone !== 'undefined') {
            if (typeof updater.phone !== 'string') {
                ret = false;
            }
        }

        if (typeof updater.contactName !== 'undefined') {
            if (typeof updater.contactName !== 'string') {
                ret = false;
            }
        }

        return ret;
    }

    async createAndSave(customer: Customer): Promise<number> {
        const cust = new Customer();
        cust.name = customer.name;
        cust.street = customer.street;
        cust.city = customer.city;
        cust.state = customer.state;
        cust.postalCode = customer.postalCode;
        cust.phone = customer.phone;
        cust.contactName = customer.contactName;

        await this.save(cust);
        return cust.id;
    }

    async allCustomers(): Promise<Customer[]> {
        const customers = await this.find();
        return customers;
    }

    async findOneCustomer(id: number, includeInvoices?: boolean): Promise<Customer> {
        const opts: any = {
            where: {
                id: id
            }
        };
        if (includeInvoices) {
            opts.relations = ['invoices'];
        }
        const customer = await this.findOne(opts);
        if (!CustomerRepository.isCustomer(customer)) {
            throw new Error(`No Customer was found for id: ${id}.`);
        }
        return customer;
    }

    async updateCustomer(id: number, customer: Customer): Promise<number> {
        if (!CustomerRepository.isCustomerUpdater(customer)) {
            throw new Error(`Customer update id ${id} did not recieve a Customer updater.`);
        }

        await this.manager.update(Customer, id, customer);
        return id;
    }

    async deleteCustomer(customer: number | Customer) {
        if (typeof customer !== 'number' && !CustomerRepository.isCustomer(customer)) {
            throw new Error('Supplied customer object is not a Customer.');
        }

        await this.manager.delete(Customer, typeof customer === 'number' ? customer : customer.id);
    }
}
