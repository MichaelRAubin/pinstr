import express from "express";
import BaseController from "../utils/BaseController";
import { favoritesService } from "../services/FavoritesService";
import auth0Provider from "@bcwdev/auth0provider";

export class FavoritesController extends BaseController {
    constructor() {
        super("api/favorites");
        this.router
            .use(auth0Provider.getAuthorizedUserInfo)
            .get("", this.get)
            .post("", this.create)
            .delete("/:favoriteId", this.delete);
    }
    async get(req, res, next) {
        try {
            req.query.creatorEmail = req.userInfo.email;
            let favorites = await favoritesService.get(req.query)
            res.send(favorites)
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            let favorite = await favoritesService.create(req.userInfo.email, req.body)
            res.send(favorite);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            let favorite = await favoritesService.delete(req.userInfo.email, req.params.favoriteId);
            res.send(favorite)
        } catch (error) {
            next(error);
        }
    }
}
