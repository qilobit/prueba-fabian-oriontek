import * as admin from 'firebase-admin';
import { addAddress } from './restfull/addAddress';
import { addCustomer } from './restfull/addCustomer';
import { deleteAddress } from './restfull/deleteAddress';
import { deleteCustomer } from './restfull/deleteCustomer';
import { getCustomerAddress } from './restfull/getCustomerAddress';
import { getCustomers } from './restfull/getCustomers';

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.getCustomers = getCustomers;
exports.getCustomerAddress = getCustomerAddress;
exports.addCustomer = addCustomer;
exports.addAddress = addAddress;
exports.deleteCustomer = deleteCustomer;
exports.deleteAddress = deleteAddress;