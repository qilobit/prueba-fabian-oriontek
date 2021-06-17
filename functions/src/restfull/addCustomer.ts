import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Collections } from '../commons/Collections';

export const addCustomer = functions.https.onRequest(async (req: any, res: any) => {
  const { companyId, name } = req.body;

  if(!companyId || !name){
    return res.json({
      ok: false,
      data: 'Missing parameters (companyId, name)'
    });
  }

  const _firestore = admin.firestore();
  const companyRef = _firestore.collection(Collections.companies).doc(companyId);

  console.log('IN addCustomer ', companyId, name);

  try {
    
    const newCustomer = await companyRef.collection(Collections.customers).add({
      name
    });

    return res.json({
      ok: true,
      data: {
        id: newCustomer.id,
        name: name
      }
    });
    
  } catch (error) {
    console.log('ERROR addCustomer ',error);
    return res.json({
      ok: false,
      data: error.message
    });
  }

});