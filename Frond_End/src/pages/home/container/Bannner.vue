<template>
  <Carousel
    ref="carousel"
    v-model="currentSlide"
    :wrap-around="true"
    transition="300"
  >
    <Slide v-for="slide in slides" :key="slide.id">
      <div class="w-full carousel__item">
        <img :src="slide.image" :alt="slide.alt" />
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent, ref } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { images } from "../../../constants";

export default defineComponent({
  name: "CustomNavigation",
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  setup() {
    const currentSlide = ref(0);

    const slides = [
      { id: 1, image: images.Banner1, alt: "Banner 1" },
      { id: 2, image: images.Banner2, alt: "Banner 2" },
      { id: 3, image: images.Banner3, alt: "Banner 3" },
    ];

    const next = () => {
      carousel.value.next();
    };

    const prev = () => {
      carousel.value.prev();
    };

    return {
      currentSlide,
      slides,
      next,
      prev,
    };
  },
});
</script>

<style>
/* Define your CSS styles for carousel items here */
</style>
