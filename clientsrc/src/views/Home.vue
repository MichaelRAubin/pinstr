<template>
  <div class="home container-fluid">
    <div class="row mt-3">
      <div class="col-10 m-auto col-md-4" v-for="pin in pins" :key="pin.id">
        <Pin class="my-2" :pin="pin" />
      </div>
    </div>
  </div>
</template>

<script>
import Pin from "@/components/Pin.vue";

export default {
  name: "Home",
  components: {
    Pin
  },
  computed: {
    pins() {
      return this.$store.state.pins;
    }
  }
};
</script>
