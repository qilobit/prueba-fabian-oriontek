<template>
  <div class="row">
    <div class="col-sm-12 text-left">
      <router-link :to="to ? to : '/customers'" class="btn btn-outline-primary"><i class="fa fa-arrow-left"></i>&nbsp;Go back</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GoHome',
  props: ['to']
}
</script>