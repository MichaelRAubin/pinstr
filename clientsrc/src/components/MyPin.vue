<template>
  <div class="mypin">
    <div class="card p-2 pin shadow">
      <h4>{{pin.title}}</h4>
      <p>{{pin.description}}</p>
      <hr />
      <div class="d-flex justify-content-between align-items-center">
        <user-avatar :user="pin.creator" height="40" rounded show-name />
      </div>
    </div>
  </div>
</template>
<script>
import UserAvatar from "../components/UserAvatar";
import Pin from "../components/Pin";
export default {
  name: "mypin",
  props: {
    myPin: { type: Object, required: true }
  },
  components: {
    UserAvatar,
    Pin
  },
  computed: {
    myPins() {
      return this.$store.state.myPins;
    }
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