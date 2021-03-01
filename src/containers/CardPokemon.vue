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
      <div>
        <GridDesktopView :list-of-pokemon="arrCardPokemon" />
        <CarouselVisaoMobile :list-of-pokemon="arrCardPokemon" />
      </div>
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
    await this.carregarCards();
  },
  methods: {
    async carregarCards() {
      this.arrCardPokemon = [];
      this.isCarregandoDados = true;
      const params = { pageSize: 100, orderBy: "name", q: "supertype:pokemon" };

      if (this.namePokemon.length > 0) {
        params.q += ` name:*${this.namePokemon}*`;
      }

      const objQueryParams = new URLSearchParams(params).toString();

      const objResponse = await this.objCardService.get(
        "/cards",
        objQueryParams
      );

      const arr = objResponse.data?.data ?? [];

      this.arrCardPokemon = arr;
      this.isCarregandoDados = false;

      //   console.log(this.arrCardPokemon);
    },
  },
};
</script>

<style scoped></style>
