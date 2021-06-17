import * as admin from 'firebase-admin';
import { Collections } from '../commons/Collections';

export const addAddress = async (req: any, res: any) => {
  const { companyId, customerId } = req.params; 
  const { address, city, state, zip_code } = req.body;

  if(!companyId || !customerId || !address || !city || !state){
    return res.send({
      ok: false,
      data: 'Missing parameters (companyId, customerId, address, city, state)'
    });
  }

  const _firestore = admin.firestore();
  const companyRef = _firestore.collection(Collections.companies).doc(companyId);
  const customerRef = companyRef.collection(Collections.customers).doc(customerId);

  console.log('IN addAddress ', companyId, customerId, address, city, state, zip_code);

  try {

    _firestore.runTransaction(async (trans) => {

      const newAddressRef = customerRef.collection(Collections.address);
      await trans.create(newAddressRef.doc(), {
        address, 
        city, 
        state, 
        zip_code,
        created_at: admin.firestore.FieldValue.serverTimestamp()
      });

      await trans.update(customerRef, {
        address_count: admin.firestore.FieldValue.increment(1)
      });

    });

    return res.send({
      ok: true,
      data: ''
    });
    
  } catch (error) {
    console.log('ERROR addAddress ',error);
    return res.send({
      ok: false,
      data: error.message
    });
  }

};