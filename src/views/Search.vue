<template>
  <div id="search">
    <div class="header">
      <a href="/"> <h1 class="margin-top-3">locl.</h1> </a>
      <SearchBar class="margin-top-3" widthClass="width-med" />
      <CartHeader class="margin-top-3" />
    </div>
    <div class="searchBody margin-3">
      <div class="searchResults">
        <div class="searchResultHeader">
          <p class="resultsSummary">{{ resultsSummary }}</p>
        </div>  
        <template v-if="hasResults">
          <SearchItem v-for="result of searchResults" :key="result.uid" :item="result" />
        </template>
        <template v-else>
          No results found
        </template>
      </div>
      <GoogleMap />
    </div>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar';
import CartHeader from '../components/CartHeader';
import SearchItem from '../components/SearchItem';
import GoogleMap from '../components/GoogleMap';

export default {
  components: {
    SearchBar,
    CartHeader,
    SearchItem,
    GoogleMap
  },

  computed: {
    searchResults () {
      return this.$store.state.searchResults;
    },

    lastSearch () {
      return this.$store.state.lastSearch;
    },

    numResults () {
      return this.searchResults.length;
    },

    hasResults () {
      return this.numResults > 0;
    },

    resultsSummary () {
      return `${this.numResults} ${this.numResults > 1 ? 'results': 'result'} for "${this.lastSearch}" near you:`;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_global.scss';
#search {
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }

  .searchBody {
    background-color: $dark-white;
    border-radius: 15px;
    width: 95%;
    height: 90%;
    display: flex;

    .searchResults {
      margin: 1vh;
      width: 100%;

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

  h1 {
    font-weight: bold;
    color: $primary;
    font-size: 3rem;
  }
}
</style>