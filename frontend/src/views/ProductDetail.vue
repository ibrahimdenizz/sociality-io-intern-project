<template>
  <div class="product-detail">
    <img :src="product.img" :alt="product.name" width="300" height="300" />
    <div>
      <h1>{{ product.name }}</h1>
      <h3>Price: £{{ product.price }}</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["id"],
  data() {
    return {
      product: {
        name: "",
        img: "",
        price: "",
      },
    };
  },
  computed: {
    ...mapState(["config"]),
  },
  beforeMount() {
    fetch(this.config.API_URL + "product?id=" + this.id)
      .then((res) => res.json())
      .then((res) => (this.product = res.data));
  },
};
</script>

<style lang="scss" scoped>
.product-detail {
  margin: 0 100px;
  display: flex;

  & div {
    margin: 0 30px;
  }
}
</style>
