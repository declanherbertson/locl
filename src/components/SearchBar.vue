<template>
  <div class="searchBarWrapper">
    <div class="searchBarParent" :class="widthClass">
      <div class="zipcodeBar">
        <mapMarker class="mapMarker" />
        <div v-if="zipcodeLoading" class="loader">
          Loading...
        </div>
        <div v-else-if="zipcode && zipcode.length >= 6 && !zipcodeInputOn" @click="togglezipcodeInputOn" class="zipcode">
          {{ zipcode }}
        </div>
        <div v-else>
          <input 
            ref="zipcodeInput"
            v-model.trim="zipcode"
            class="zipcodeInput"
            @keyup.enter="togglezipcodeInputOff"
            placeholder="Enter Postal Code" />
        </div>
      </div> 
      <div class="searchBar">
        <input 
        type="text"
        v-model.trim="search"
        @keyup.enter="attemptSearch"
        @focus="togglezipcodeInputOff"
        placeholder="Soap, Kitchen Equipment, Gift ideas..." 
        class="searchInput" />
        <button @click="attemptSearch" class="searchButton"> 
          <Magnify v-if="!searching"/> 
          <div v-else class="loader"> Searching....</div>
        </button>
      </div>
    </div>
    <p v-if="showNozipcode" class="error">
      Please enter your zipcode to continue.
    </p>
  </div>
</template>

<script>
import MapMarker from 'vue-material-design-icons/MapMarker.vue';
import Magnify from 'vue-material-design-icons/Magnify.vue';
import geo from '@/utils/geolocation.js';

export default {
  components: {
    MapMarker,
    Magnify
  },

  props: {
    widthClass: {
      default: 'width-large',
      required: false
    }
  },

  data() {
    return {
      searching: false,
      showNozipcode: false,
      zipcodeLoading: false,
      zipcodeInputOn: false
    }
  },

  computed: {
    zipcode: {
      get () {
        return this.$store.state.zipcode;
      },

      set (val) {
        this.showNozipcode = false;
        this.$store.commit('setZipcode', val);
      }
    },
    
    search: {
      get () {
        return this.$store.state.search;
      },

      set (val) {
        this.$store.commit('setSearch', val);
      }
    }
  },

  methods: {
    async attemptSearch () {
      if (!this.zipcode) {
        this.showNozipcode = true;
        return;
      }
      this.searching = true;
      console.log("attempt search for ", this.search, this.zipcode);
      await this.$store.dispatch('performSearch', { zipcode: this.zipcode, search: this.search });
      this.searching = false;
    },

    async togglezipcodeInputOn () {
      this.zipcodeInputOn = true;
      await this.$nextTick();
      this.$refs.zipcodeInput.focus();
    },

    async togglezipcodeInputOff () {
      this.zipcodeInputOn = false;
      if (this.zipcode !== '') {
        this.$store.dispatch('setLocationAction', { zipcode: this.zipcode })
      }
    }
  },

  async mounted () {
    if (this.zipcode) {
      return;
    }
    if (navigator.geolocation) {
      this.zipcodeLoading = true;
      try {
        const position = await new Promise((res, rej) => {
          navigator.geolocation.getCurrentPosition((position) => res(position), (error) => rej(error));
        });
        const response = await geo.reverseGeolocationLookup(position);
        this.zipcode = response[0].zipcode.replace(/ /g,''); // This is for node-geo api
        console.log(this.zipcode)
        this.$store.dispatch('setLocationAction', { zipcode: this.zipcode })
      } catch(e) { 
          console.log("error", e)
      } finally {
        this.zipcodeLoading = false;
      }
    } else {
      console.log("not supported")
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/_global.scss';
.searchBarWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  .error {
    margin-top: 0.5rem;
    font-size: 12px;
  }
}

.searchBarParent {
  height: 3rem;
  &.width-med {
    width: 35rem;
  }

  &.width-large {
    width: 40rem;
  }
  display: flex;

  .zipcodeBar {
    background-color: $background-dark;
    border-radius:25px 0 0 25px;
    display: flex;
    align-items: center;

    .zipcodeInput {
      background: none;
      border: none;
      height: 100%
    }

    .zipcode {
      font-size: 14px;
      padding-right: 0.5rem;
    }
  }

  .searchBar {
    flex-grow: 5;
    display: flex;
    background-color: white;
    border-radius: 0 25px 25px 0;

    .searchInput {
      padding-left: 0.5rem;
      width: 90%;
      height: 100%;
      background: none;
      border: none;
    }
  }

  .searchButton {
    background: none;
    border: none;
  }
  
  svg {
    fill: $primary-dark;
  }

  .mapMarker {
    margin-left: 0.5rem;
  }
}

// spinner
.loader,
.loader:after {
  border-radius: 50%;
  width: 1em;
  height: 1em;
}
.loader {
  // margin: 60px auto;
  fill: $primary-dark;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid $primary-dark;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>