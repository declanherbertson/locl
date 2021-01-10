<template>
  <div id="addBusiness">
    <section>
      <div class="col2">
        <form @submit.prevent>
          <h1>Add a Business</h1>
          <div>
            <label for="name">Business Name</label>
            <input v-model.trim="businessForm.name" type="text" placeholder="Benny's Boutique" />
          </div>
          <!-- <div>
            <label for="address">Address</label>
            <input v-model.trim="businessForm.address" type="text" placeholder="4516 West 10th, Vancouver, BC" />
          </div> -->
          <div>
            <label for="zipcode">Postal Code</label>
            <input v-model.trim="businessForm.zipcode" type="text" placeholder="V5R3J1" />
          </div>
          <div>
            <label for="category">Category</label>
            <input v-model.trim="businessForm.category" type="text" placeholder="furniture" />
          </div>
          <div>
            <label for="url">Business Image URL</label>
            <input v-model.trim="businessForm.url" type="text" placeholder="https://google.images/dfafdasdfasdfads" />
          </div>
          <div>
            <h2 v-if="hasListings"> Products </h2>
            <div v-for="listing of listings" :key="listing.id">
              <div>
                <label for="name">Product Name</label>
                <input v-model.trim="listing.name" type="text" placeholder="Speckeled Black Chair" />
              </div>
              <div>
                <label for="name">Product Description</label>
                <input v-model.trim="listing.description" type="text" placeholder="A Beautiful Black Chair with Speckeled finish" />
              </div>
              <div>
                <label for="price">Price</label>
                <input v-model.trim="listing.price" type="text" placeholder="43.99" />
              </div>
              <div>
                <label for="tags">Search terms (seperate with commas)</label>
                <input v-model.trim="listing.tags" type="text" placeholder="chair, black chair, speckled black chair, speckled chair, furniture" />
              </div>
              <div>
                <label for="url">Image URL</label>
                <input v-model.trim="listing.url" type="text" placeholder="https://google.images/asdfasfafdaf" />
              </div>
              <button class="button margin-5 margin-left-0" @click="() => removeListing(listing.id)">remove Listing</button>
            </div>
          </div>
          <button @click="addListing" class="button margin-5 margin-left-0">Add Listing</button>
          <button @click="submit" class="button margin-5 margin-left-0">Add Business</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import geo from '@/utils/geolocation.js';
export default {
  data() {
    return {
      key: 0,
      businessForm: {
        name: '',
        zipcode: '',
        category: '',
        url: '',
        // address: '',
      },
      listings: [],
    }
  },

  computed: {
    hasListings () {
      return this.listings.length > 0;
    }
  },

  methods: {
    async submit () {
      // get location
      const location = await geo.geolocationLookup(this.businessForm.zipcode);
      console.log(location);
      // arrayify tags
      const formListings = this.listings.map((listing) => {
        const newListing = { ...listing };
        newListing['tags'] = listing['tags'].split(',').map(tag => tag.trim());
        return newListing;
      })
      console.log(JSON.stringify(this.businessForm), JSON.stringify(this.listings));
      await this.$store.dispatch('addBusiness', {
        name: this.businessForm.name || '',
        // address: this.businessForm.address || '',
        zipcode: this.businessForm.zipcode || '',
        category: this.businessForm.category || '',
        url: this.businessForm.url || '',
        location: location || '',
        listings: formListings
      });
      this.clearForm();
    },

    clearForm () {
      this.businessForm = {};
      this.listings = [];
    },

    addListing () {
      this.listings.push({ id: this.key++, name: '', price: '', url: '', description: '', tags: '' })
    },

    removeListing (id) {
      this.listings.splice(this.listings.findIndex((listing) => listing.id === id), 1);
    },
  }
}
</script>
