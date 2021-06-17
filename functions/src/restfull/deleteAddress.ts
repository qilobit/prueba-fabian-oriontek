import * as admin from 'firebase-admin';
import { Collections } from '../commons/Collections';

export const deleteAddress = async (req: any, res: any) => {
  const { companyId, customerId, addressId } = req.params;

  if(!companyId || !customerId || !addressId){
    return res.send({
      ok: false,
      data: 'Missing parameters (companyId, customerId, addressId)'
    });
  }

  const _firestore = admin.firestore();
  const companyRef = _firestore.collection(Collections.companies).doc(companyId);
  const customerRef = companyRef.collection(Collections.customers).doc(customerId);
  const addressRef = customerRef.collection(Collections.address).doc(addressId);

  console.log('IN deleteAddress ', companyId, customerId, addressId);

  try {
    
    await addressRef.delete();
    
    _firestore.runTransaction(async (trans) => {

      await trans.delete(addressRef);

      await trans.update(customerRef, {
        address_count: admin.firestore.FieldValue.increment(-1)
      });

    });

    return res.send({
      ok: true,
    });
    
  } catch (error) {
    console.log('ERROR deleteAddress ',error);
    return res.send({
      ok: false,
      data: error.message
    });
  }

};