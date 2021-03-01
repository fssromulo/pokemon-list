<template>
  <div
    class="col-xs-12 col-sm-12 col-md-4 col-lg-3 d-block d-sm-block d-md-none d-lg-none d-xl-none"
  >
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          v-for="(cardPokemon, index) in listOfPokemon"
          :key="cardPokemon.id"
          :index="index"
          class="carousel-item"
          :class="index == 0 ? 'active' : ''"
        >
          <div class="text-center">
            <router-link
              :to="{ name: `details`, params: { id: cardPokemon.id } }"
            >
              <img
                class="d-block w-100"
                :src="cardPokemon.images.small"
                :alt="`Imagem de ${cardPokemon.name}`"
              />
            </router-link>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
        style="color: black"
      >
        <span
          style="color: black"
          class="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span style="color: black" class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  props: {
    listOfPokemon: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>
