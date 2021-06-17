import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Collections } from '../commons/Collections';

export const deleteCustomer = functions.https.onRequest(async (req: any, res: any) => {
  const { companyId, customerId } = req.body;

  if(!companyId || !customerId){
    return res.json({
      ok: false,
      data: 'Missing parameters (companyId, customerId)'
    });
  }

  const _firestore = admin.firestore();
  const companyRef = _firestore.collection(Collections.companies).doc(companyId);
  const customerRef = companyRef.collection(Collections.customers).doc(customerId);

  console.log('IN deleteCustomer ', companyId, customerId);

  try {
    
    await customerRef.delete();

    return res.json({
      ok: true,
    });
    
  } catch (error) {
    console.log('ERROR deleteCustomer ',error);
    return res.json({
      ok: false,
      data: error.message
    });
  }

});