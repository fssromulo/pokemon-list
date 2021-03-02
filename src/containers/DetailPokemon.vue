<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li
          style="cursor:pointer"
          class="breadcrumb-item btn-link"
          @click="$router.push('/')"
        >
          {{ objCardPokemon.name }}
        </li>
        <li class="breadcrumb-item active" aria-current="page">Detalhes</li>
      </ol>
    </nav>

    <div v-if="isLoading">Carregando ...</div>
    <div v-if="!isLoading">
      <div class="container-fluid">
        <div class="row">
          <span data-bs-toggle="modal" data-bs-target="#pokemonModal">
            <GridDesktopView
              :list-of-pokemon="[objCardPokemon]"
              :show-detail="true"
            />
          </span>
        </div>
      </div>

      <!-- Modal -->
      <div
        class="modal fade"
        id="pokemonModal"
        tabindex="-1"
        aria-labelledby="pokemonModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="pokemonModalLabel">
                {{ objCardPokemon.name }} ataques
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <ul
                class="list-group"
                v-show="objCardPokemon.attacks.length > 0"
                v-for="(attack, index) in objCardPokemon.attacks"
                :key="index"
                :index="index"
              >
                <li class="list-group-item active" aria-current="true">
                  Nome: {{ attack.name }}
                </li>
                <li class="list-group-item">Descrição: {{ attack.text }}</li>
                <li class="list-group-item">Dano: {{ attack.damage }}</li>
                <li class="list-group-item">
                  Custo de “mana”: {{ attack.convertedEnergyCost }}
                </li>
                <br />
              </ul>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardService from "../service/cards/cardService";
import GridView from "./desktop-view/GridView";

export default {
  name: "DetailPokemon",

  components: {
    GridDesktopView: GridView,
  },
  data() {
    return {
      objCardService: {},
      objCardPokemon: [],
      idPokemon: null,
      showAtacks: false,
      isLoading: false,
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
    },
    async carregarCards() {
      this.objCardPokemon = [];
      this.isLoading = true;

      const objResponse = await this.objCardService.get(
        "/cards/" + this.idPokemon
      );
      this.objCardPokemon = objResponse.data?.data ?? [];

      this.isLoading = false;
      console.log(this.objCardPokemon);
    },
  },
};
</script>

<style scoped></style>
