<template>
  <div class="">
    <GoHome />
    <div v-if="loading">
      <Loading />
    </div>
    <div v-else>
      <div class="row mt-3">
        <div class="col-sm-8 text-left"><h2>{{ customer.name }} Address book</h2></div>
        <div class="col-sm-4 text-right">
          <router-link :to="`/customer/${customer.id}/address/add`" class="btn btn-primary text-white">
            <i class="fa fa-plus"></i>&nbsp;
            Add address
          </router-link>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 col-md-10">
          <div class="table-responsive">
            <table class="table table-bordered table-sm">
              <thead class="table-primary">
                <tr>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Zip code</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="x in addressList" :key="x.id" >
                  <td>{{ x.address }}</td>
                  <td>{{ x.city }}</td>
                  <td>{{ x.state }}</td>
                  <td>{{ x.zip_code }}</td>
                  <td>
                    <a href="#" @click.prevent="drop(x)" title="Delete" class="mr-1"><span class="fa fa-trash text-danger"></span></a>&nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
import { GLOBAL_COMPANY } from '../commons/constants';
import {AddressService} from '../services/AddressService';
import {CustomerService} from '../services/CustomerService';
import GoHome from './GoHome.vue';
import Loading from './Loading.vue';

export default {
  name: 'CustomerDetail',
  data(){
    return {
      addressList: [],
      customer: {
        id: '',
        name: ''
      },
      loading: true
    }
  },
  components: {GoHome, Loading},
  methods: {
    async drop(address){
      const confirm = await this.$helpers.confirm('This can\' be undone');
      if(confirm === true){
        try {
          this.loading = true;
          const res = await AddressService.deleteCustomerAddress(GLOBAL_COMPANY, this.customer.id, address.id);
          if(res.ok){
            this.addressList = this.addressList.filter(c => c.id !== address.id);
            this.$helpers.toast('Address deleted!');
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
    const res = await CustomerService.getCustomerWithAdress(GLOBAL_COMPANY, this.$route.params.id);
    this.addressList = res.data.address_list;
    this.customer = res.data.customer;
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
