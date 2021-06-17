import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { addAddress } from './restfull/addAddress';
import { addCustomer } from './restfull/addCustomer';
import { deleteAddress } from './restfull/deleteAddress';
import { deleteCustomer } from './restfull/deleteCustomer';
import { getCustomerAddress } from './restfull/getCustomerAddress';
import { getCustomers } from './restfull/getCustomers';

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get('/company/:companyId/customers', getCustomers);
app.get('/company/:companyId/customer/:customerId/address', getCustomerAddress);

app.post('/company/:companyId/customers', addCustomer);
app.post('/company/:companyId/customer/:customerId/address', addAddress);

app.delete('/company/:companyId/customer/:customerId', deleteCustomer);
app.delete('/company/:companyId/customer/:customerId/address/:addressId', deleteAddress);

app.get('/', function(req:any, res:any){
  res.send('This is a test API for oriontek by Fabian Johnson');
})

exports.api = functions.https.onRequest(app);