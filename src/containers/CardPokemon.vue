<template>
  <div>
    <nav class="navbar fixed-top navbar-light bg-light">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          v-model="namePokemon"
          :disabled="isCarregandoDados"
          placeholder="Nome do pokemon..."
          v-on:keyup.enter="carregarCards"
        />

        <input
          class="btn btn-primary"
          style="margin-left:10px"
          type="button"
          :disabled="isCarregandoDados"
          v-on:click="carregarCards"
          value="Pesquisar"
        />
      </div>
      <small v-show="getPokemonsBuscados.length > 0">
        Últimos pokemons buscados: <strong>{{ getPokemonsBuscados }}</strong>
      </small>
    </nav>

    <div class="row" style="margin-top: 100px;">
      <div class="offset-md-4 col-md-4">
        <h3>PokeList.:</h3>
      </div>
    </div>

    <div class="row">
      <div
        class="offset-md-4 col-md-4"
        v-show="!isCarregandoDados && arrCardPokemon.length === 0"
      >
        Nenhum resultado encontrado
        <span v-show="namePokemon.length > 0"
          >para <strong>"{{ namePokemon }}"</strong>
        </span>
      </div>
    </div>

    <div class="row">
      <div class="offset-md-4 col-md-4" v-show="isCarregandoDados">
        <div
          class="spinner-border"
          style="width: 3rem; height: 3rem;"
          role="status"
        >
          <span class="visually-hidden"></span>
        </div>
      </div>
    </div>

    <div v-if="!isCarregandoDados && arrCardPokemon.length > 0">
      <GridDesktopView
        :list-of-pokemon="arrCardPokemon"
        :show-detail="false"
        :click-grid-view="goToDetailsPokemon"
      />
      <CarouselVisaoMobile :list-of-pokemon="arrCardPokemon" />
    </div>
  </div>
</template>

<script>
import CardService from "../service/cards/cardService";

import Carousel from "./mobile-view/Carousel.vue";
import GridView from "./desktop-view/GridView";

export default {
  name: "CardPokemon",

  components: {
    CarouselVisaoMobile: Carousel,
    GridDesktopView: GridView,
  },

  data() {
    return {
      objCardService: null,
      namePokemon: "",
      arrCardPokemon: [],
      isCarregandoDados: false,
    };
  },

  async mounted() {
    this.objCardService = new CardService();
  },

  computed: {
    getPokemonsBuscados() {
      const listLastFivePokemons =
        this.$store.getters.getListLastFivePokemons ?? [];
      return listLastFivePokemons.join(", ");
    },
  },

  methods: {
    goToDetailsPokemon(cardPokemon) {
      this.$router.push({
        name: `details`,
        params: { id: cardPokemon.id },
      });
    },

    async carregarCards() {
      this.arrCardPokemon = [];
      this.isCarregandoDados = true;
      const params = { pageSize: 100, orderBy: "name", q: "supertype:pokemon" };

      if (this.namePokemon.length > 0) {
        params.q += ` name:*${this.namePokemon}*`;
      }

      const objQueryParams = new URLSearchParams(params).toString();

      this.$store.dispatch("setNomePokemon", this.namePokemon ?? "");

      const objResponse = await this.objCardService.get(
        "/cards",
        objQueryParams
      );

      this.arrCardPokemon = objResponse.data?.data ?? [];
      this.isCarregandoDados = false;
    },
  },
};
</script>

<style scoped></style>
