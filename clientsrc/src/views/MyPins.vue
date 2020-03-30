<template>
  <div class="home container-fluid">
    <div class="row mt-3">
      <div class="col-10 m-auto col-md-4" v-for="myPin in myPins" :key="myPin.creatorEmail">
        <MyPin class="my-2" :myPin="myPin" />
      </div>
    </div>
  </div>
</template>
<script>
import MyPin from "../components/MyPin";
export default {
  name: "MyPins",
  data() {
    return {
      myPins: {}
    };
  },
  methods: {
    async getMyPins() {
      let myPins = await this.$store.dispatch("getMyPins");
    }
  },
  mounted() {
    this.getMyPins();
  }
};
</script>
<style lang="scss" scoped>
</style>