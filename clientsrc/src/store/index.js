import Vue from 'vue';
import Vuex from 'vuex';
import { $resource } from "./resource";
import { pinsService } from '../../../server/services/PinsService';
import { PinSchema } from '../../../server/models/Pin';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    pins: []
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
    removePin(state, pin, _id) {
      let i = state.pins.findIndex(p => p._id == pin._id)
      if (i != -1) {
        state.pins.splice(i, 1, _id)
      }
    }
  },
  actions: {
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

    async createPin({ commit }, pinData) {
      let pin = await $resource.post("api/pins", pinData);
      pin.creator = pinData.creator;
      commit("addPin", pin);
    },
    async removePin({ commit, state }, pin, _id) {
      await $resource.delete("api/pins/" + _id)
      commit("removePin", pin, _id)
    }
  },
  modules: {
  }
});
