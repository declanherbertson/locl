<template>
  <div id="cart">
    <div class="header">
      <router-link to="/"> <h1 class="margin-top-3">locl.</h1> </router-link>
      <SearchBar class="margin-top-3" widthClass="width-med" />
      <CartHeader class="margin-top-3" />
    </div>
    <div class="cartBody margin-3">
      <div class="cart">
        <div class="cartHeader">
          <p>Your Shopping Cart</p>
          <p> {{ numResults }} {{ numResults > 1 ? 'items' : 'item'}} </p>
        </div>  
        <div class="cartList" v-if="hasResults">
          <SearchItem v-for="result of cartItems" :key="result.uid" :item="result" :hideAddToCart="true" />
        </div>
        <div class="else" v-else>
          No items in your cart.
        </div>
      </div>
      <div class="invoice">
        <h2> Order Summary </h2>
        <div class="subtotal">
          <p>Subtotal</p>
          <p>${{ subtotal }}</p>
        </div>
        <div class="shipping">
          <p>Shipping</p>
          <p>${{ shipping }}</p>
        </div>
        <div class="taxes">
          <p>Taxes</p>
          <p>${{ taxes }}</p>
        </div>
        <div class="fee">
          <p>LocL. Fee</p>
          <p>${{ fee }}</p>
        </div>
        <div class="total">
          <p>Total</p>
          <p>${{ total }}</p>
        </div>
        <button :disabled="!hasResults" class="checkout"> Checkout </button>
      </div>  
    </div>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar';
import CartHeader from '../components/CartHeader';
import SearchItem from '../components/SearchItem';

export default {
  components: {
    SearchBar,
    CartHeader,
    SearchItem
  },

  computed: {
    cartItems () {
      return this.$store.state.cart;
    },

    numResults () {
      return this.cartItems.length;
    },

    hasResults () {
      return this.numResults > 0;
    },

    subtotal () {
      return this.cartItems.map(i => i.price).reduce((acc, curr) => acc + Number(curr), 0);
    },

    shipping () {
      return this.subtotal * 0.1;
    },

    taxes () {
      return Math.round(this.subtotal * 0.12 * 100) / 100;
    },

    fee () {
      return Math.round(this.subtotal * 0.03 * 100) / 100;
    },

    total () {
      return this.subtotal + this.shipping + this.taxes + this.fee;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_global.scss';
#cart {
  position: absolute;
  width: 100%;
  height: 100%;

  .invoice {
    height: 50%;
    padding: 3rem;
    margin: 1rem;
    background-color: $background-dark;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    h2 {
      white-space: nowrap;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        color: black!important;
      }
    }
    button {
      background-color: $primary;
      border-radius: 15px;
      color: white;
      border: none;
      padding: 0.5rem;
      margin-top: 1rem;

      &:disabled {
        background-color: $background;
        color: black;
      }
    }
  }

  .cartHeader {
    display: flex;
    align-items: center;
    font-weight: bold;
    p {
      margin: 0.5rem;
    }
  }

  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }

  .cartBody {
    background-color: $dark-white;
    border-radius: 15px;
    width: 95%;
    height: 90%;
    display: flex;

    .cart {
      margin: 1vh;
      width: 100%;
      overflow-y: scroll;

      .searchResultHeader {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        .resultsSummary {
          color: black;
          margin: 0;
          margin-right: 3rem;
        }
      }
    }
  }

  .else {
    margin-left: 0.5rem;
  }

  h1 {
    font-weight: bold;
    color: $primary;
    font-size: 3rem;
  }
}
</style>