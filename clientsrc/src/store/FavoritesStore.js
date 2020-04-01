import { $resource } from "./resource";
import { toastSuccess } from "@bcwdev/quickvue";

export default {
    state: {
        favorites: []
    },
    mutations: {
        setFavorites(state, favorites) {
            state.favorites = favorites;
        },
        addFavorite(state, favorite) {
            state.favorites.push(favorite);
        },
        removeFavorite(state, favorite) {
            let i = state.favorites.findIndex(fav => fav.id == favorite.id);
            if (i == -1) { return; }
            state.favorites.splice(i, 1);
        }
    },
    actions: {
        async getFavorites({ commit }) {
            let favorites = await $resource.get("api/favorites");
            commit("setFavorites", favorites);
        },
        async addFavorite({ commit }, pin) {
            let favorite = await $resource.post("api/favorites", { pin });
            commit("addFavorite", favorite);
            toastSuccess("Added Favorite");
        },
        async removeFavorite({ commit }, favorite) {
            await $resource.delete("api/favorites/" + favorite.id);
            commit("removeFavorite", favorite);
            toastSuccess("Removed Favorite");
        },
    },
    getters: {
        favorites(state) {
            // iterate over the state.favorites 
            // array and use each pinId as a key in an object
            let mappedFavorites = {};
            state.favorites.forEach(fav => {
                mappedFavorites[fav.pin] = fav;
            });

            return mappedFavorites;
        }
    }
};