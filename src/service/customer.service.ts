import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Customer } from '../entity';
import { CustomerRepository } from '../repository';

@Service()
export class CustomerService {
    @OrmRepository()
    private readonly customerRepository: CustomerRepository;

    async findAll(): Promise<Customer[]> {
        return await this.customerRepository.allCustomers();
    }

    async findById(id: number): Promise<Customer> {
        return await this.customerRepository.findOneCustomer(id);
    }

    async create(customer: Customer): Promise<number> {
        return await this.customerRepository.createAndSave(customer);
    }

    async update(id: number, customer: Customer): Promise<number> {
        return await this.customerRepository.updateCustomer(id, customer);
    }

    async delete(customer: number | Customer) {
        await this.customerRepository.delete(customer);
    }
}
