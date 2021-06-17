const HttpService = require("./HttpService");

class CompanyService{
  static async getCompanies(){
    return await HttpService.get(`getCompanies`);
  }
}

module.exports = {CompanyService};