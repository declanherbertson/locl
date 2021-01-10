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
    maxRange: 10
  },

  mutations: {
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

    async performSearch({ state, commit }, { zipcode, search }) {
      // fetch user profile
      const listings = await fb.listingsCollection.where('tags', 'array-contains', search).get();
      const concreteListings = []
      listings.forEach(doc => {
        concreteListings.push(doc.data());
      })

      // set user profile in state
      commit('setSearchResults', listings.data())
    },
  }
})

export default store
