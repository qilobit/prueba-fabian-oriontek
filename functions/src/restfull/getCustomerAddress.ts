import * as admin from 'firebase-admin';
import { Collections } from '../commons/Collections';
import { formatDate } from '../commons/utils';

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
    const customerSnapshot = await customerRef.get();
    const customerData = customerSnapshot.data();
    const addressSnapshot = await customerRef.collection(Collections.address).get();
    const addresslist = addressSnapshot.docs.map((address: FirebaseFirestore.DocumentSnapshot) => {
      const data = address.data();
      return {
        id: address.id,
        address: data?.address,
        city: data?.city,
        state: data?.state,
        zip_code: data?.zip_code,
        created_at: formatDate(data?.created_at.toDate())
      };
    });

    return res.send({
      ok: true,
      data: {
        customer: {
          id: customerRef.id,
          name: customerData?.name,
          address_count: customerData?.address_count,
          created_at: formatDate(customerData?.created_at.toDate())
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