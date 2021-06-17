import * as admin from 'firebase-admin';
import { Collections } from '../commons/Collections';

export const getCustomers = async (req: any, res: any) => {
  const { companyId } = req.params;

  if(!companyId){
    return res.send({
      ok: false,
      data: 'Missing parameter (companyId)'
    });
  }

  const _firestore = admin.firestore();
  const companyRef = _firestore.collection(Collections.companies).doc(companyId);

  console.log('IN getCustomers ',companyId);

  try {
    
    const customersSnapshot = await companyRef.collection(Collections.customers).orderBy('name').get();
    const customers = customersSnapshot.docs.map((customer: FirebaseFirestore.DocumentSnapshot) => {
      return {
        id: customer.id,
        ...customer.data()
      };
    });

    return res.send({
      ok: true,
      data: customers
    });
    
  } catch (error) {
    console.log('ERROR getCustomers ',error);
    return res.send({
      ok: false,
      data: error.message
    });
  }

};