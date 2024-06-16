
import { Router } from "express";

const router = Router(); 

import ProductManager from '../manager/productManager.js'; 
import { productValidator } from "../middleware/productValidator.js";
const manager = new ProductManager("./src/data/products.json");


router.get("/", async(req, res)=>{
    try {
        const { limit } = req.query; 
        const products = await manager.getProducts(parseInt(limit));  
        res.status(200).json(products); 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
    } 
}); 

router.get("/:id", async(req, res)=>{
    try {
        const { id } = req.params; 
        console.log(id);
        const products = await manager.getProductById(id);
        if(products) res.status(200).json(products); 
        else res.status(404).json({ msg: "El producto no existe" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
    }
    
}); 


router.post("/",productValidator, async(req, res)=>{
    try {
        console.log(req.body)
        const product = await manager.addProduct(req.body);
        
        if(product) res.status(201).json(product); 
        else res.status(404).json({ msg: "Error al crear el producto" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
    }
});

//eliminar un producto por id 
router.delete("/:id", async(req, res)=>{
    try {
        const { id } = req.params; 
        console.log(id);
        const products = await manager.deleteProducts(id);
        if(products) res.status(200).json(products); 
        else res.status(404).json({ msg: "Error al borrar el producto" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
    }
});


router.put("/:id",productValidator, async(req, res)=>{
    try {
        const { id } = req.params; 
        console.log(id);
        const products = await manager.updateProduct(id, req.body);
        if(products) res.status(200).json(products); 
        else res.status(404).json({ msg: "Error al actualizar el producto" });

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
    }
});

export default router 
