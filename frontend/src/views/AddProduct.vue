<template>
  <div class="addProduct">
    <p v-if="addingStatus === 'pending'" class="pending">
      Wait for adding product
    </p>
    <p v-else-if="addingStatus === 'added'" class="success">
      The product is successfully added. You can find the product in
      <router-link to="/">product page</router-link>
    </p>
    <p v-else-if="addingStatus === 'not-found'" class="error">
      The product is not found or url is invalid
    </p>
    <p v-else-if="addingStatus === 'error'" class="error">
      The product can't added. Please try again later!
    </p>
    <form @submit.prevent="addProduct()">
      <div class="form-item">
        <label for="url">Product Url</label> <br />
        <input v-model="url" type="text" name="url" id="url" />
      </div>
      <div class="form-item">
        <button>Add Product</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      url: "",
      addingStatus: "",
    };
  },
  computed: {
    ...mapState(["config"]),
  },

  methods: {
    addProduct() {
      this.addingStatus = "pending";
      fetch(this.config.API_URL + "product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: this.url }),
      }).then((res) => {
        if (res.status >= 500) this.addingStatus = "error";
        else if (res.status >= 400) this.addingStatus = "not-found";
        else this.addingStatus = "added";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.addProduct {
  margin: 0 100px;

  .form-item {
    margin: 15px 0;
  }

  .form-item label {
    font-size: 24px;
  }
  .form-item input {
    width: 600px;
    padding: 0.5rem;
  }
  .form-item button {
    padding: 10px 15px;
    border: none;
    background-color: #d27423;
    color: white;
    box-shadow: none;
    outline: none;
    cursor: pointer;
  }
  .form-item button:hover {
    background-color: darken(#d27423, 10);
  }
  .form-item button:active {
    background-color: darken(#d27423, 5);
  }
}
</style>
