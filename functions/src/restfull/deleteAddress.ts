import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Collections } from '../commons/Collections';

export const deleteAddress = functions.https.onRequest(async (req: any, res: any) => {
  const { companyId, customerId, addressId } = req.body;

  if(!companyId || !customerId || !addressId){
    return res.json({
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

    return res.json({
      ok: true,
    });
    
  } catch (error) {
    console.log('ERROR deleteAddress ',error);
    return res.json({
      ok: false,
      data: error.message
    });
  }

});