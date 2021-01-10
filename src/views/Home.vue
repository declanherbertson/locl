<template>
  <div id="home">
    <h1 class="margin-top-20">locl.</h1>
    <h2 class="margin-top-5">Find your favourite items from small businesses around you</h2>
    <SearchBar class="margin-top-3" />
    <img id="houses" class="margin-top-10" src="../assets/img/Local-businesses.png" />
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar';

export default {
  components: {
    SearchBar
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_global.scss';
#home {
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 { 
    font-weight: bold;
    font-size: 4rem;
    -webkit-text-stroke: 1px black;
    text-shadow: 0 2px black;
  }

  h2 {
    font-weight: normal;
    color: $primary-dark;
  }

  img#houses {
    min-width: 45%;
    height: auto;
  }
}
</style>
