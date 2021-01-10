<template>
  <div id="cartHeader">
    <a href="/cart">
      <CartOutline />
      <p>Cart (0)</p>
    </a>
  </div>
</template>

<script>
import CartOutline from 'vue-material-design-icons/CartOutline.vue';

export default {
  components: {
    CartOutline,
  },
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
