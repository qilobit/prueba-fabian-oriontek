const HttpService = require("./HttpService");

class CustomerService{
  static async getCustomers(companyId){
    return await HttpService.get(`company/${companyId}/customers`);
  }

  static async saveCustomer(companyId, customerName){
    return await HttpService.post(`company/${companyId}/customers`, {
      name: customerName
    });
  }
  
  static async deleteCustomer(companyId, customerId){
    const url = `company/${companyId}/customer/${customerId}`;
    return await HttpService.delete(url);
  }

  static async getCustomerWithAdress(companyId, customerId){
    return await HttpService.get(`company/${companyId}/customer/${customerId}/address`);
  }

  
}

module.exports = {CustomerService};