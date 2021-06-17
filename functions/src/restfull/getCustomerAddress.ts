import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Collections } from '../commons/Collections';

export const getCustomerAddress = functions.https.onRequest(async (req: any, res: any) => {
  const { companyId, customerId } = req.query;

  if(!companyId || !customerId){
    return res.json({
      ok: false,
      data: 'Missing parameters (companyId, customerId)'
    });
  }

  const _firestore = admin.firestore();
  const companyRef = _firestore.collection(Collections.companies).doc(companyId);
  const customerRef = companyRef.collection(Collections.customers).doc(customerId);

  console.log('IN getCustomerAddress ',companyId);

  try {
    
    const addressSnapshot = await customerRef.collection(Collections.address).get();
    const addresslist = addressSnapshot.docs.map((address: FirebaseFirestore.DocumentSnapshot) => {
      return {
        id: address.id,
        ...address.data()
      };
    });

    return res.json({
      ok: true,
      data: addresslist
    });
    
  } catch (error) {
    console.log('ERROR getCustomerAddress ',error);
    return res.json({
      ok: false,
      data: error.message
    });
  }

});