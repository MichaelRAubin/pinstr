import Vue from 'vue';
import Vuex from 'vuex';
import { $resource } from "./resource";
import { pinsService } from '../../../server/services/PinsService';
import { PinSchema } from '../../../server/models/Pin';
import { Pin } from "../../Models/Pin";
import favoritesStore from "./favoritesStore"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    pins: [],
    myPins: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setPins(state, pins) {
      state.pins = pins;
    },
    addPin(state, pin) {
      state.pins.push(pin);
    },
    removePin(state, pin) {
      let i = state.pins.findIndex(p => p.id == pin._Id)
      if (i != -1) {
        state.pins.splice(i, 1)
      }
    },
    setMyPins(state, creatorEmail) {
      let myPins = state.myPins.filter(m => m.creatorEmail == creatorEmail)
      state.myPins = myPins.map(myPinData => new Pin(myPinData));
    }
  },
  actions: {
    async initUserData({ dispatch }) {
      dispatch("getProfile");
      dispatch("getFavorites");
    },

    async getProfile({ commit }) {
      let profile = await $resource.get("api/profile");
      commit("setProfile", profile);
    },

    async updateProfile({ commit }, update) {
      let profile = await $resource.put("api/profile", update);
      commit("setProfile", profile);
    },

    async getPins({ commit }) {
      let pins = await $resource.get("api/pins");
      commit("setPins", pins);
    },

    async getMyPins({ commit }, myPins) {
      commit("setMyPins", myPins)
    },

    async createPin({ commit }, pinData) {
      let pin = await $resource.post("api/pins", pinData);
      pin.creator = pinData.creator;
      pin.id = pinData.id
      commit("addPin", pin);
    },
    async removePin({ commit }, pin) {
      await $resource.delete("api/pins/" + pin.Id)
      commit("removePin", pin)
    }
  },
  modules: {
    favoritesStore
  }
});
