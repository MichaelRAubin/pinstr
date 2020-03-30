<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-2 mx-auto">
        <div class="d-flex flex-column links">
          <router-link :to="{name:'Dashboard.Profile'}">Profile</router-link>
          <router-link :to="{name:'Dashboard.Pins'}">Create Pins</router-link>
          <router-link :to="{name:'Dashboard.MyPins'}">My Pins</router-link>
          <router-link :to="{name:'Dashboard.FavoritePins'}">My Favorites</router-link>
        </div>
      </div>
      <div class="col-8 mx-auto">
        <div class="card shadow">
          <div class="p-3">
            <h4>{{routeName}}</h4>
            <hr class="m-0 pb-0" />
          </div>
          <div class="card-body pt-1 m-0">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  computed: {
    routeName() {
      return this.$route.name.slice(this.$route.name.lastIndexOf(".") + 1);
    }
  }
};
</script>

<style scoped lang="scss">
.links a {
  transition: all 0.2s linear;
  margin-bottom: 0.5rem;
  padding: 0.35rem;
  border-left: 3px solid transparent;
  color: var(--secondary);
  &.router-link-exact-active {
    padding-left: 1rem;
    border-left: 3px solid var(--primary);
    color: var(--primary);
  }
}
</style>