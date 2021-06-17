<template>

  <div class="">
    
    <GoHome/>

    <div class="col-md-10 col-12 content text-left mt-3">
      <h3>Add new customer</h3>
      <div class="border p-3">
        <div class="form-group">
          <label for="name">Name</label>
          <input ref="_name" type="text" id="name" v-model="name" class="form-control">
          <span v-if="error" class="text-danger">Name is required</span>
        </div>
        <div class="form-group text-right mt-3">
          <button :disabled="loading" @click="save" class="btn btn-success">
            <div v-if="!loading"><i class="fa fa-save"></i> Save</div>
            <div v-else>Wait...</div>
          </button>
        </div>
      </div>
    </div>    
  </div>

</template>

<script>
import {CustomerService} from '../services/CustomerService';
import GoHome from './GoHome.vue';
export default {
  name: 'AddCustomer',
  components: {GoHome},
  data(){
    return {
      name: '',
      error: false,
      loading: false
    }
  },
  methods:{
    async save(){
      if(String(this.name).trim() == ''){
        this.error = true;
        this.$refs._name.focus();
        return;
      }
      this.error = false;
      this.loading = true;
      try {
        const res = await CustomerService.saveCustomer('6LBUW53f8jY0k6dgqxUS', this.name);
        if(res.ok){
          this.name = '';
          this.$helpers.toast('Customer created!');

        }else{
          this.$helpers.message('Error', res.data);
        }
      } catch (error) {
        this.$helpers.message('Error', 'Something went wrong');
      }
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.content{
  margin: 0 auto;
}
</style>
