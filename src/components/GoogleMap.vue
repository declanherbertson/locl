<template>
  <div id="googleMap">
    <GmapMap
      :center="myLoc"
      :zoom="11"
       :options="{
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          disableDefaultUi: true
        }"
      map-type-id="terrain"
      style="width: 100%; height: 100%;">
        <GmapMarker
    :key="index"
    v-for="(m, index) in resultLocs"
    :position="m"
    :clickable="false"
    :draggable="false"
    @click="center=m"
  />
    </GmapMap>
  </div>
</template>

<script>
import CartOutline from 'vue-material-design-icons/CartOutline.vue';

export default {
  computed: {
    myLoc () {
      return this.$store.state.location;
    },

    resultLocs () {
      const results = this.$store.state.searchResults;
      const distinctLoc = {};
      for (let result of results) {
        distinctLoc[result.businessName] = result.location;
      }
      const locations = Object.values(distinctLoc);
      console.log(locations);
      return locations;
    }
  }
}

</script>

<style scope lang="scss">
@import '../assets/scss/_global.scss';
#googleMap {
    width: 100%;
    height: 90%;
    background-color: $primary;
    border-radius: 15px;
    margin: 1rem;
  }
</style>