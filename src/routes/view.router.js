import express from 'express';
import { Router } from "express";
import ProductManager from '../manager/productManager.js';

const manager = new ProductManager("./src/data/products.json");

const router = Router();

router.get("/home", async(req, res) => {
    const products = await manager.getProducts();
    res.render("home", {products}); 
})

router.get("/realtimeProducts", (req, res) => {
    res.render("realTimeProducts"); 
})

export default router