import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Collections } from '../commons/Collections';

export const addAddress = functions.https.onRequest(async (req: any, res: any) => {
  const { companyId, customerId, address, city, state, zip_code } = req.body;

  if(!companyId || !customerId || !address || !city || !state){
    return res.json({
      ok: false,
      data: 'Missing parameters (companyId, customerId, address, city, state)'
    });
  }

  const _firestore = admin.firestore();
  const companyRef = _firestore.collection(Collections.companies).doc(companyId);
  const customerRef = companyRef.collection(Collections.customers).doc(customerId);

  console.log('IN addAddress ', companyId, customerId, address, city, state, zip_code);

  try {
    
    const newAddress = await customerRef.collection(Collections.address).add({
      address, 
      city, 
      state, 
      zip_code
    });

    return res.json({
      ok: true,
      data: {
        id: newAddress.id,
        address, 
        city, 
        state, 
        zip_code
      }
    });
    
  } catch (error) {
    console.log('ERROR addAddress ',error);
    return res.json({
      ok: false,
      data: error.message
    });
  }

});