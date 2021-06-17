import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Collections } from '../commons/Collections';

export const getCustomers = functions.https.onRequest(async (req: any, res: any) => {
  const { companyId } = req.query;

  if(!companyId){
    return res.json({
      ok: false,
      data: 'Missing parameter (companyId)'
    });
  }

  const _firestore = admin.firestore();
  const companyRef = _firestore.collection(Collections.companies).doc(companyId);

  console.log('IN getCustomers ',companyId);

  try {
    
    const customersSnapshot = await companyRef.collection(Collections.customers).get();
    const customers = customersSnapshot.docs.map((customer: FirebaseFirestore.DocumentSnapshot) => {
      return {
        id: customer.id,
        ...customer.data()
      };
    });

    return res.json({
      ok: true,
      data: customers
    });
    
  } catch (error) {
    console.log('ERROR getCustomers ',error);
    return res.json({
      ok: false,
      data: error.message
    });
  }

});