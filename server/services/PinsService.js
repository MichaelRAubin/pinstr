import { dbContext } from "../db/DbContext";

class PinsService {
  async getAll(query = {}) {
    // TODO BL goes here
    return await dbContext.Pins.find(query).populate("creator", "name picture -email");
  }
  async getOne(id) {
    // TODO BL goes here
    return await dbContext.Pins.findById(id).populate("creator", "name picture -email");
  }
  async create(pin) {
    return await dbContext.Pins.create(pin);
  }
  async delete(_id) {
    // @ts-ignore
    return await dbContext.Pins.findByIdAndRemove(_id)
  }
}

export const pinsService = new PinsService();