import * as admin from 'firebase-admin';
import { Collections } from '../commons/Collections';

export const addCustomer = async (req: any, res: any) => {
  const { companyId } = req.params; 
  const { name } = req.body;

  if(!companyId || !name){
    return res.send({
      ok: false,
      data: 'Missing parameters (companyId, name)'
    });
  }

  const _firestore = admin.firestore();
  const companyRef = _firestore.collection(Collections.companies).doc(companyId);

  console.log('IN addCustomer ', companyId, name);

  try {

    const customerWithThatName = await companyRef.collection(Collections.customers).where('name', '==', name).get();

    if(customerWithThatName.docs.length > 0){
      return res.send({
        ok: false,
        data: 'A customer with that name already exists'
      });
    }

    _firestore.runTransaction(async (trans) => {

      const newCustomerRef = companyRef.collection(Collections.customers);
      await trans.create(newCustomerRef.doc(), {
        name,
        address_count: 0
      });

      await trans.update(companyRef, {
        customer_count: admin.firestore.FieldValue.increment(1)
      });

    });

    return res.send({
      ok: true,
      data: ''
    });
    
  } catch (error) {
    console.log('ERROR addCustomer ',error);
    return res.send({
      ok: false,
      data: error.message
    });
  }

};