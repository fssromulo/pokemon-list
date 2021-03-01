import Vue from "vue";
import VueRouter from "vue-router";

import CardPokemonList from "../../src/containers/CardPokemon";
import DetailPokemon from "../../src/containers/DetailPokemon";

Vue.use(VueRouter);
const routes = [
  {
    path: "/card-list",
    component: CardPokemonList,
    name: "cardPokemonList",
  },
  {
    path: "/details/:id",
    component: DetailPokemon,
    name: "details",
  },
  { path: "*", redirect: "/card-list" },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
