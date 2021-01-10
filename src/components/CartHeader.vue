<template>
  <div id="cartHeader">
    <router-link to="/cart">
      <CartOutline />
      <p>Cart ({{numCart}})</p>
    </router-link>
  </div>
</template>

<script>
import CartOutline from 'vue-material-design-icons/CartOutline.vue';

export default {
  components: {
    CartOutline,
  },

  computed: {
    numCart () {
      return this.$store.state.cart.length;
    }
  }
}

</script>

<style scope lang="scss">
@import '../assets/scss/_global.scss';

#cartHeader {
  a {
    display: flex;
    align-items: center;
    p {
      margin: 0;
    }
    svg {
      fill: $primary
    }
  }
}
</style>
