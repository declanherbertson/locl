<template>
  <div class="searchItem">
      <img src="https://secure.img1-fg.wfcdn.com/im/50455291/compr-r85/6092/60926851/bedwell-dining-table.jpg" />
      <div class="searchItemBody">
        <div class="business">
          <span> {{ item.businessName }}</span>
          <span class="distance"> {{ item.distance }} km </span>
        </div>
        <p class="name">
          {{ item.name }}
        </p>
        <p class="description">
          {{ item.description }}
        </p>
          <p class="price"> 
            ${{ item.price }} 
          </p>
          <button @click="addToCart" class="addToCartBtn">
            <CartOutline />
            <p> Add to Cart </p>
          </button>
      </div>
  </div>
</template>

<script>
import CartOutline from 'vue-material-design-icons/CartOutline.vue';
export default {
  components: {
    CartOutline
  },

  props: {
    item: {
      required: true,
      type: Object
    },
  },

  data () {
    return {
      quantity: 0,
    }
  },

  methods: {
    async addToCart() {
      console.log('add to cart');
    }
  }
}

</script>

<style scope lang="scss">
@import '../assets/scss/_global.scss';
.searchItem {
  margin-bottom: 1rem;
  box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  img {
    width: 30%;
    height: 30%;
    margin: 0.5rem;
  }

  .searchItemBody {
    margin-left: 2rem;
    .name {
      color: black;
      margin: 0;
    }
    p.description, span.distance {
      color: rgba(0,0,0,0.5);
    }
    .distance {
      margin-left: 0.5rem;
    }
    .addToCartBtn {
      display: flex;
      align-items: center;
      border-radius: 5px;
      border-color: $background-dark;
      background-color: $background-dark;
      border-width: 0px;
      padding-left: 1rem;
      padding-right: 1rem;
      p {
        margin: 0;
        margin-left: 0.5rem;
      }
      svg {
        fill: rgba(0,0,0,0.75);
      }
    }
  }
}
</style>