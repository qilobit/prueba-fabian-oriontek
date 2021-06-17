import * as admin from 'firebase-admin';
import { Collections } from '../commons/Collections';

export const getCustomerAddress = async (req: any, res: any) => {
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

  console.log('IN getCustomerAddress ',companyId);

  try {
    const customerData = await customerRef.get();
    const addressSnapshot = await customerRef.collection(Collections.address).get();
    const addresslist = addressSnapshot.docs.map((address: FirebaseFirestore.DocumentSnapshot) => {
      return {
        id: address.id,
        ...address.data()
      };
    });

    return res.send({
      ok: true,
      data: {
        customer: {
          id: customerRef.id,
          ...customerData.data()
        },
        address_list: addresslist
      }
    });
    
  } catch (error) {
    console.log('ERROR getCustomerAddress ',error);
    return res.send({
      ok: false,
      data: error.message
    });
  }

};