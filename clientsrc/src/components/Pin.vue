<template>
  <div class="card p-2 pin shadow">
    <div class="d-flex align-items-center justify-contents-between">
      <h4>{{pin.title}}</h4>
      <favorite-icon class="favorite-icon" :pin="pin" />
    </div>
    <p>{{pin.description}}</p>
    <hr />
    <div class="d-flex justify-content-between align-items-center">
      <user-avatar :user="pin.creator" height="40" rounded show-name />
      <i
        class="fa fa-trash text-muted mr-2"
        v-if="$auth.isAuthenticated && $auth.user.email == pin.creatorEmail"
        @click="deletePin"
      ></i>
    </div>
  </div>
</template>

<script>
import UserAvatar from "./UserAvatar";
import FavoriteIcon from "./FavoriteIcon";
export default {
  name: "Pin",
  props: {
    pin: { type: Object, required: true }
  },
  components: {
    UserAvatar,
    FavoriteIcon
  },
  methods: {
    async deletePin(pin) {
      let yes = await this.$confirm("Delete the pin?");
      if (!yes) {
        return;
      } else {
        this.$store.dispatch("removePin", pin);
      }
    }
  }
};
</script>

<style>
</style>