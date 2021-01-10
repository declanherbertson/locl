import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'
import geo from '@/utils/geolocation.js';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    searchResults: [],
    zipcode: '',
    location: {},
    search: '',
    lastSearch: '',
    cart: []
  },

  mutations: {
    updateCart(state, val) {
      state.cart.push(val);
    },

    removeCart(state, val) {
      state.cart.splice(state.cart.indexOf(val), 1);
    },

    setSearchResults(state, val) {
      state.searchResults = val;
    },

    setZipcode(state, val) {
      state.zipcode = val;
    },

    setLocation(state, val) {
      state.location = val;
    },

    setMaxRange(state, val) {
      state.maxRange = val;
    },

    setSearch(state, val) {
      state.search = val;
    },

    setLastSearch(state, val) {
      state.lastSearch = val;
    }
  },

  actions: {
    async setLocationAction( { commit }, { zipcode }) {
      const location = await geo.geolocationLookup(zipcode);
      commit('setLocation', location || {});
      console.log("set location to", JSON.stringify(location))
    },

    async addBusiness({ commit }, form) {
      const businessId = `${form.name}_${form.zipcode}`;
      await fb.businessesCollection.doc(businessId).set({
        name: form.name,
        zipcode: form.zipcode,
        location: form.location,
        category: form.category,
        url: form.url
      });

      for (let listing of form.listings) {
        const listingId = `${businessId}_${listing.name}`;
        await fb.listingsCollection.doc(listingId).set({
          businessId: businessId,
          businessName: form.name,
          location: form.location,
          tags: listing.tags || [],
          name: listing.name || '',
          description: listing.description || '',
          price: listing.price || '',
          url: listing.url || ''
        });
      }
    },

    async performSearch({ state, commit }) {
      const searchTerms = [state.search.toLowerCase(), ...state.search.split(" ").map(a => a.toLowerCase())]
      const listings = await fb.listingsCollection.where('tags', 'array-contains-any', searchTerms).get();
      let concreteListings = []
      listings.forEach(doc => {
        concreteListings.push(doc.data());
      })
      console.log(concreteListings);

      // filter by distance
      const userLat = state.location.lat;
      const userLng = state.location.lng;

      concreteListings = concreteListings.map((listing) => {
        const newListing = { ...listing };
        let dist = geo.distance(userLat, userLng, listing.location.lat, listing.location.lng);
        dist = Math.round(dist * 10) / 10;
        console.log('dist', dist);
        newListing['distance'] = dist;
        return newListing;
      });

      concreteListings = concreteListings.sort((a, b) => a.distance > b.distance ? 1 : -1);

      commit('setSearchResults', concreteListings);
      commit('setLastSearch', state.search);

      if (router.currentRoute.path !== '/search') {
        router.push('/search');
      }
    },
  }
})

export default store
