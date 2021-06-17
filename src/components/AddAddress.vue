<template>

  <div class="">
    
    <GoHome :to="`/customer/${$route.params.id}`" />

    <div class="col-md-10 col-12 content text-left mt-3">
      <h3>Add new address</h3>
      <form @submit.prevent="save">
        <div class="border p-3">

          <div class="form-group">
            <label for="address">Address</label>
            <input ref="address" type="text" id="address" v-model="address" class="form-control">
            <span v-if="errors.address" class="text-danger">Address is required</span>
          </div>

          <div class="form-group">
            <label for="city">City</label>
            <input ref="city" type="text" id="city" v-model="city" class="form-control">
            <span v-if="errors.city" class="text-danger">City is required</span>
          </div>

          <div class="form-group">
            <label for="state">State</label>
            <input ref="state" type="text" id="state" v-model="state" class="form-control">
            <span v-if="errors.state" class="text-danger">State is required</span>
          </div>

          <div class="form-group">
            <label for="zip_code">Zip code</label>
            <input ref="zipCode" type="text" id="zip_code" v-model="zipCode" class="form-control">
            <span v-if="errors.zipCode" class="text-danger">Zip code is required</span>
          </div>        

          <div class="form-group text-right mt-3">
            <button :disabled="loading" type="submit" class="btn btn-success">
              <div v-if="!loading"><i class="fa fa-save"></i> Save</div>
              <div v-else>Wait...</div>
            </button>
          </div>
        </div>
      </form>
    </div>    
  </div>

</template>

<script>
import {AddressService} from '../services/AddressService';
import GoHome from './GoHome.vue';
import {GLOBAL_COMPANY} from '../commons/constants';
export default {
  name: 'AddCustomer',
  components: {GoHome},
  data(){
    return {
      customerId: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      errors: {
        address: false,
        city: false,
        state: false,
        zipCode: false,
      },
      loading: false
    }
  },
  methods:{
    async save(){
      if(String(this.address).trim() == ''){
        this.errors.address = true;
        this.$refs.address.focus();
        return;
      }
      this.errors.address = false;

      if(String(this.city).trim() == ''){
        this.errors.city = true;
        this.$refs.city.focus();
        return;
      }
      this.errors.city = false;

      if(String(this.state).trim() == ''){
        this.errors.state = true;
        this.$refs.state.focus();
        return;
      }
      this.errors.state = false;

      if(String(this.zipCode).trim() == ''){
        this.errors.zipCode = true;
        this.$refs.zipCode.focus();
        return;
      }
      this.errors.zipCode = false;

      this.loading = true;
      try {
        const res = await AddressService.saveCustomerAddress(
          GLOBAL_COMPANY, 
          this.$route.params.id,
          this.address,
          this.city,
          this.state,
          this.zipCode
        );
        if(res.ok){

          this.address = '';
          this.city = '';
          this.state = '';
          this.zipCode = '';
          this.$helpers.toast('Address created!');
          this.$refs.address.focus();
          
        }else{
          this.$helpers.message('Error', res.data);
        }
      } catch (error) {
        this.$helpers.message('Error', 'Something went wrong');
      }
      this.loading = false;
    }
  },
}
</script>

<style scoped>
.content{
  margin: 0 auto;
}
</style>
