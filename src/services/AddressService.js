const HttpService = require("./HttpService");

class AddressService{
  static async getCustomerAddress(companyId, customerId){
    return await HttpService.get(`company/${companyId}/customer/${customerId}/address`);
  }

  static async saveCustomerAddress(companyId, customerId, address, city, state, zip_code){
    return await HttpService.post(`company/${companyId}/customer/${customerId}/address`, {
      address, 
      city, 
      state, 
      zip_code
    });
  }
  
  static async deleteCustomerAddress(companyId, customerId, addressId){
    const url = `company/${companyId}/customer/${customerId}/address/${addressId}`;
    return await HttpService.delete(url);
  }
  
}

module.exports = {AddressService};