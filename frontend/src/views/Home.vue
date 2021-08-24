<template>
  <div class="home">
    <h1>Products Page</h1>
    <products></products>
  </div>
</template>

<script>
import Products from "@/components/Products.vue";
import { mapActions } from "vuex";

export default {
  components: {
    Products,
  },
  methods: {
    ...mapActions([
      "getProducts", //also supports payload `this.nameOfAction(amount)`
    ]),
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin: 0 100px;
}
</style>
