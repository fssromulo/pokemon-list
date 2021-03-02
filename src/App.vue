<template>
  <div class="container-fluid" id="app">
    <router-view>
      <CardPokemon />
    </router-view>
  </div>
</template>

<script>
import CardPokemon from "./containers/CardPokemon.vue";

export default {
  name: "App",
  components: {
    CardPokemon,
  },
  created() {
    this.$store.dispatch("loadListFivePokemon");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
