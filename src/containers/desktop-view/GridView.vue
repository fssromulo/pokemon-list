<template>
  <section class="row">
    <div
      v-for="(cardPokemon, index) in listOfPokemon"
      :key="cardPokemon.id"
      :index="index"
      class="col-xs-12 col-sm-12 col-md-4 col-lg-3 d-none d-sm-none d-md-block d-lg-block d-xl-block"
    >
      <router-link
        :to="{
          name: `details`,
          params: { id: cardPokemon.id },
        }"
      >
        <div class="card" style="width: 18rem;">
          <div class="text-center">
            <img
              class="card-img-top img-thumbnail img-fluid"
              :src="cardPokemon.images.small"
              :alt="`Imagem de ${cardPokemon.name}`"
              style="max-width:60%;max-height:80%;"
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ cardPokemon.name }}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Id: {{ cardPokemon.id }}</li>
            <li class="list-group-item">
              Tipos: {{ tipoDoPokemon(cardPokemon.types) }}
            </li>
          </ul>
        </div>
      </router-link>
      <br />
      <br />
    </div>
  </section>
</template>

<script>
import { tipoDoPokemon } from "../../utils/utils-functions";
export default {
  name: "GridView",
  props: {
    listOfPokemon: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      tipoDoPokemon: tipoDoPokemon,
    };
  },
};
</script>
