<template>
  <div class="products">
    <table>
      <tr>
        <th>Product</th>
        <th>Price</th>
      </tr>
      <tr
        v-for="product in products"
        :key="product._id"
        class="product"
        @click="goProductDetail(product._id)"
      >
        <td>
          <h5>{{ product.name }}</h5>
        </td>
        <td>
          <p>£{{ product.price }}</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["products"]),
  },
  methods: {
    goProductDetail(id) {
      this.$router.push("/" + id);
    },
  },
};
</script>

<style lang="scss" scoped>
.products {
  display: flex;
}
.product {
  margin: 30px;
  color: #2c3e50;
  & h5 {
    overflow-wrap: break-word;
  }

  &:hover {
    cursor: pointer;
  }
}
table {
  border-collapse: separate;
  border-spacing: 50px 0;
}

td,
th {
  margin: 0 20px;
}
</style>
