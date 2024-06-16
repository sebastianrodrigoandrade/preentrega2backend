
import { Router } from "express";

const router = Router();

import cartManager from "../manager/cartManager.js"
const manager = new cartManager("./src/data/carts.json");


// para crear un carrito con id y [], 
router.post("/", async(req, res)=>{
    try {
        res.status(201).json(await manager.createCart()); 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
    }
})

//lista los productos que pertenecen al acrrito con ese id 
router.get("/:cid", async(req, res)=>{
    try {
        const { cid } = req.params;
        const cart = await manager.getCartById(cid);
        if(cart) res.status(201).json(cart);
        else res.status(404).json({msg: "El carrito no existe"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
        
    }

})

router.post("/:cid/product/:pid",async(req, res)=>{
    try {
        const {cid, pid } = req.params;
        const cartId = Number(cid);
        const productId = Number(pid);
        res.status(200).json(await manager.addProductToCart(cartId, productId));
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
    }

})

export default router 