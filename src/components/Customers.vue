<template>
  <div class="">
    <div class="row">
      <div class="col-sm-8 text-left"><h2>Test company customers</h2></div>
      <div class="col-sm-4 text-right">
        <router-link to="/customers/add" class="btn btn-primary text-white">
          <i class="fa fa-plus"></i>&nbsp;
          Add customer
        </router-link>
      </div>
    </div>

    <Loading v-if="loading" class="mt-3" />
    <div v-else class="row mt-3">
      <div class="col-12 col-md-10">

        <table class="table table-responsive table-bordered table-sm">
          <thead class="table-primary">
            <tr>
              <th>Name</th>
              <th>Address count</th>
              <th>Created at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="x in customers" :key="x.id" >
              <td>{{ x.name }}</td>
              <td>{{ x.address_count }}</td>
              <td>{{ x.created_at }}</td>
              <td>
                <a href="#" @click.prevent="drop(x)" title="Delete" class="mr-1"><span class="fa fa-trash text-danger"></span></a>&nbsp;
                <router-link :to="`/customer/${x.id}`" title="Details" >
                  <i class="fa fa-eye text-info"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import { GLOBAL_COMPANY } from '../commons/constants';
import {CustomerService} from '../services/CustomerService';
import Loading from './Loading.vue';

export default {
  name: 'Customers',
  data(){
    return {
      loading: false,
      customers: []
    }
  },
  components: {Loading},
  methods: {
    async drop(customer){
      const confirm = await this.$helpers.confirm('This can\' be undone');
      if(confirm === true){
        try {
          this.loading = true;
          const res = await CustomerService.deleteCustomer(GLOBAL_COMPANY, customer.id);
          if(res.ok){
            this.customers = this.customers.filter(c => c.id !== customer.id);
            this.$helpers.toast('Customer deleted!');
          }else{
            this.$helpers.message('Error', res.data);
          }
        } catch (error) {
          this.$helpers.message('Error', 'Something went wrong');
        }
        this.loading = false;
      }
    }
  },
  async created(){
    this.loading = true;
    const res = await CustomerService.getCustomers(GLOBAL_COMPANY);
    if(res.ok){
      this.customers = res.data;
    }else{
      this.$helpers.message('Error', 'Something went wrong getting customers list');
    }
    this.loading = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
