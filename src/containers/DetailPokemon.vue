<template>
  <div class="hello">
    <h1>{{ objCardPokemon.name }}</h1>
    <br />
    <img :src="objCardPokemon.images.small" />
    <br />
    <span>Nome: {{ objCardPokemon.name }}</span>
    <br />
    <span>Id: {{ objCardPokemon.id }}</span>
    <br />
    <span>Tipos: {{ tipoDoPokemon(objCardPokemon.types) }}</span>
    <br />

    <span>
      <span
        v-show="
          objCardPokemon.resistances && objCardPokemon.resistances.length > 0
        "
      >
        Resistencia:
        {{ listarAResistenciaPokemon(objCardPokemon.resistances) }}
      </span>
      <span
        v-show="
          !objCardPokemon.resistances || objCardPokemon.resistances.length == 0
        "
      >
        <strong> Sem resistência para listar </strong>
      </span>
    </span>
    <br />
    <span>
      <span
        v-show="
          objCardPokemon.weaknesses && objCardPokemon.weaknesses.length > 0
        "
      >
        Fraquezas:
        {{ listarAFraquezaPokemon(objCardPokemon.weaknesses) }}
      </span>
      <span
        v-show="
          !objCardPokemon.weaknesses || objCardPokemon.weaknesses.length == 0
        "
      >
        <strong> Sem fraquezas para listar </strong>
      </span>
    </span>
    <br />
    <br />
    <button v-on:click="mostrarAtaques">
      Mostrar ataques
    </button>
    <br />
    <hr />
    <br />
    <br />

    <div v-show="showAtacks">
      <div
        v-show="objCardPokemon.attacks.length > 0"
        v-for="(attack, index) in objCardPokemon.attacks"
        :key="index"
        :index="index"
      >
        <br />
        <span>Nome: {{ attack.name }}</span>
        <br />
        <span>Descrição: {{ attack.text }}</span>
        <br />
        <span>Dano: {{ attack.damage }}</span>
        <br />
        <span> Custo de “mana”: {{ attack.convertedEnergyCost }} </span>

        <br />
        <hr />
        <br />
      </div>
      <button v-on:click="esconderAtaques">
        Esconder ataques
      </button>
    </div>
  </div>
</template>

<script>
import CardService from "../service/cards/cardService";
import {
  tipoDoPokemon,
  listarAResistenciaPokemon,
  listarAFraquezaPokemon,
} from "../utils/utils-functions";

export default {
  name: "DetailPokemon",
  data() {
    return {
      objCardService: null,
      objCardPokemon: [],
      idPokemon: null,
      tipoDoPokemon: tipoDoPokemon,
      listarAResistenciaPokemon: listarAResistenciaPokemon,
      listarAFraquezaPokemon: listarAFraquezaPokemon,
      showAtacks: false,
    };
  },

  async mounted() {
    this.objCardService = new CardService();
    this.idPokemon = this.$route.params.id;
    await this.carregarCards();
  },
  methods: {
    esconderAtaques() {
      this.showAtacks = false;
    },
    mostrarAtaques() {
      this.showAtacks = true;
      this.objCardPokemon.attacks;
    },
    async carregarCards() {
      this.objCardPokemon = [];

      const objResponse = await this.objCardService.get(
        "/cards/" + this.idPokemon
      );
      this.objCardPokemon = objResponse.data?.data ?? [];

      console.log(this.objCardPokemon);
    },
  },
};
</script>

<style scoped></style>
