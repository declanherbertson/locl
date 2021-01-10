import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

// realtime firebase
// fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
//   let postsArray = []

//   snapshot.forEach(doc => {
//     let post = doc.data()
//     post.id = doc.id

//     postsArray.push(post)
//   })

//   store.commit('setPosts', postsArray)
// })

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
    searchResults: [],
    zipcode: '',
    maxRange: 10
  },

  mutations: {
    setSearchResults(state, val) {
      state.searchResults = val;
    },

    setZipcode(state, val) {
      state.zipcode = val;
    },

    setMaxRange(state, val) {
      state.maxRange = val;
    }
  },

  actions: {
    async addBusiness({ commit }, form) {
      const businessId = `${form.name}_${form.postalCode}`;
      await fb.businessesCollection.doc(businessId).set({
        name: form.name,
        postalCode: form.postalCode,
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

    async performSearch({ state, commit }, {zipcode, search}) {
      // fetch user profile
      const listings = await fb.listingsCollection.where('tags', 'array-contains', search).get();

      // TODO filter by distance
      console.warn(listings.data());

      // set user profile in state
      commit('setSearchResults', listings.data())

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
  }
})

export default store
