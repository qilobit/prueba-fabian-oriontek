import * as admin from 'firebase-admin';
import { Collections } from '../commons/Collections';

export const deleteCustomer = async (req: any, res: any) => {
  const { companyId, customerId } = req.params;

  if(!companyId || !customerId){
    return res.send({
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

    _firestore.runTransaction(async (trans) => {

      await trans.delete(customerRef);

      await trans.update(companyRef, {
        customer_count: admin.firestore.FieldValue.increment(-1)
      });

    });

    return res.send({
      ok: true,
    });
    
  } catch (error) {
    console.log('ERROR deleteCustomer ',error);
    return res.send({
      ok: false,
      data: error.message
    });
  }

};