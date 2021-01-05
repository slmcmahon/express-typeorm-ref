import { JsonController, Get } from 'routing-controllers';

@JsonController()
export class IndexController {
    @Get('/api/customers')
    getInvoices() {
        return { lastName: 'McDonald' };
    }
}
