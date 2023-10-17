//import fs from 'fs';
import { cartsModel } from '../../models/carts.model.js';

export default class CartManagerMongo{
    constructor() {
        this.model = cartsModel
}
async createCart(){}
async getCartById(cid){
    return await this.model.findOne({_id: cid})
}
async addProducToCart(cid, pid, quantity){
    return await this.model.findByIdAndUpdate(
        {_id: cid, 'products.product': pid},
        {$inc: {'product.$.quantity': quantity}},
        {new: true}
        )
}
}