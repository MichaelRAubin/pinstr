import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class FavoritesService {
    async get(query = {}) {
        return await dbContext.Favorites.find(query);
    }

    async create(email, favoriteData) {
        favoriteData.creatorEmail = email;
        return await dbContext.Favorites.create(favoriteData)
    }

    async delete(email, id) {
        return await dbContext.Favorites.findOneAndRemove({ creatorEmail: email, _id: id });
    }
}

export const favoritesService = new FavoritesService();