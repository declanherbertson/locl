<template>
  <div class="searchBarWrapper">
    <div class="searchBarParent">
      <div class="locationBar">
        <mapMarker class="mapMarker" />
        <div v-if="locationLoading" class="loader">
          Loading...
        </div>
        <div v-else-if="location && !locationInputOn" @click="toggleLocationInputOn" class="location">
          {{ location }}
        </div>
        <div v-else>
          <input 
            ref="locationInput"
            v-model.trim="location"
            class="locationInput"
            @blur="toggleLocationInputOff"
            @keyup.enter="toggleLocationInputOff"
            placeholder="Enter Postal Code" />
        </div>
      </div> 
      <div class="searchBar">
        <input 
        type="text"
        v-model.trim="search"
        @keyup.enter="attemptSearch"
        placeholder="Clothing, Books, Baby Supplies..." 
        class="searchInput" />
        <button @click="attemptSearch" class="searchButton"> <Magnify /> </button>
      </div>
    </div>
    <p v-if="showNoLocation" class="error">
      Please enter your location to continue.
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

  data() {
    return {
      showNoLocation: false,
      locationLoading: false,
      locationInputOn: false,
      search: '',
    }
  },

  computed: {
    location: {
      get () {
        return this.$store.state.zipcode;
      },

      set (val) {
        this.$store.commit('setZipcode', val);
      }
    }
  },

  methods: {
    attemptSearch () {
      if (!this.location) {
        this.showNoLocation = true;
        return;
      }
      console.log("attempt search for ", this.search, this.location);
    },

    async toggleLocationInputOn () {
      this.locationInputOn = true;
      await this.$nextTick();
      this.$refs.locationInput.focus();
    },

    async toggleLocationInputOff () {
      this.locationInputOn = false;
    }
  },

  async mounted () {
    if (navigator.geolocation) {
      this.locationLoading = true;
      try {
        const position = await new Promise((res, rej) => {
          navigator.geolocation.getCurrentPosition((position) => res(position), (error) => rej(error));
        });
        const response = await geo.reverseGeolocationLookup(position);
        this.location = response[0].zipcode.replace(/ /g,'');
      } catch { 
        // noop
      } finally {
        this.locationLoading = false;
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
  width: 40rem;
  display: flex;

  .locationBar {
    background-color: $background-dark;
    border-radius:25px 0 0 25px;
    display: flex;
    align-items: center;

    .locationInput {
      background: none;
      border: none;
      height: 100%
    }

    .location {
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