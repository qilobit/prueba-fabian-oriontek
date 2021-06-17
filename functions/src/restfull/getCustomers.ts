import * as admin from 'firebase-admin';
import { Collections } from '../commons/Collections';
import { formatDate } from '../commons/utils';

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
      const data = customer.data();
      return {
        id: customer.id,
        name: data?.name,
        address_count: data?.address_count,
        created_at: formatDate(data?.created_at.toDate())
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