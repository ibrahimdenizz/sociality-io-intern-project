<template>
  <div class="nav">
    <router-link to="/">Products</router-link>
    <router-link to="/add">Add Product</router-link>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  padding: 30px 65px;

  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 30px;

    &.router-link-exact-active {
      color: #d27423;
    }
  }
}
</style>
