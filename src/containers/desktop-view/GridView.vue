<template>
  <section class="row">
    <div
      v-for="(cardPokemon, index) in listOfPokemon"
      :key="cardPokemon.id"
      :index="index"
      :class="arrClasses"
    >
      <div
        class="card"
        style="width: 18rem;cursor:pointer"
        @click="clickGridView(cardPokemon)"
      >
        <div class="text-center">
          <img
            class="card-img-top img-thumbnail img-fluid"
            :src="getImageSrc(cardPokemon.images)"
            :alt="`Imagem de ${cardPokemon.name}`"
            style="max-width:60%;max-height:80%;"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ cardPokemon.name }}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Código: {{ cardPokemon.id }}</li>
          <li class="list-group-item">
            Tipos: {{ tipoDoPokemon(cardPokemon.types) }}
          </li>
          <li class="list-group-item" v-if="showDetail">
            <span
              v-show="
                cardPokemon.resistances && cardPokemon.resistances.length > 0
              "
            >
              Resistencia:
              {{ listarAResistenciaPokemon(cardPokemon.resistances) }}
            </span>
            <span
              v-show="
                !cardPokemon.resistances || cardPokemon.resistances.length == 0
              "
            >
              <strong> Sem resistência para listar </strong>
            </span>
          </li>
          <li class="list-group-item" v-if="showDetail">
            <span
              v-show="
                cardPokemon.weaknesses && cardPokemon.weaknesses.length > 0
              "
            >
              Fraquezas:
              {{ listarAFraquezaPokemon(cardPokemon.weaknesses) }}
            </span>
            <span
              v-show="
                !cardPokemon.weaknesses || cardPokemon.weaknesses.length == 0
              "
            >
              <strong> Sem fraquezas para listar </strong>
            </span>
          </li>
        </ul>
      </div>
      <br />
      <br />
    </div>
  </section>
</template>

<script>
import {
  tipoDoPokemon,
  listarAResistenciaPokemon,
  listarAFraquezaPokemon,
} from "../../utils/utils-functions";

export default {
  name: "GridView",
  props: {
    listOfPokemon: {
      type: Array,
      default: () => {
        return [];
      },
    },
    clickGridView: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
    showDetail: Boolean,
  },
  data() {
    return {
      arrClasses: [],
      tipoDoPokemon: tipoDoPokemon,
      listarAResistenciaPokemon: listarAResistenciaPokemon,
      listarAFraquezaPokemon: listarAFraquezaPokemon,
    };
  },
  mounted() {
    if (!this.showDetail) {
      this.arrClasses = [
        "col-xs-12",
        "col-sm-12",
        "col-md-4",
        "col-lg-3",
        "d-none",
        "d-sm-none",
        "d-md-block",
        "d-lg-block",
        "d-xl-block",
      ];
    }
  },
  methods: {
    getImageSrc(objImgPokemon) {
      return objImgPokemon?.small ?? "";
    },
  },
};
</script>
