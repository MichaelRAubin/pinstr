<template>
  <div id="app">
    <navbar />
    <toaster location="top-right" />
    <div class="loader" v-if="loading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { onAuth } from "@bcwdev/auth0-vue";
import { ConfigureResource } from "./store/resource";
export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      try {
        console.log("before auth");
        onAuth(this.configureApp);
        this.$store.dispatch("getPins");
      } catch (e) {
        console.error(e);
      }
    },
    configureApp() {
      console.log("here");
      if (this.$auth.isAuthenticated) {
        ConfigureResource(this);
        this.$store.dispatch("initUserData");
      }
    }
  }
};
</script>


<style lang="scss">
body {
  background: #f5fcff;
}
.loader {
  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    > div {
      position: absolute;
      border: 4px solid var(--primary);
      opacity: 1;
      border-radius: 50%;
      animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    div:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
}

.swal2-confirm {
  background: green !important;
}
</style>
