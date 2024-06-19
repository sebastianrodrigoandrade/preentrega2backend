import fs from 'fs';
import ProductManager from './productManager.js';

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];

        if (fs.existsSync(this.path)) {
            try {
                this.carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            } catch (error) {
                console.error('Error al leer el archivo', error);
                this.carts = [];
            }
        } else {
            this.carts = [];
        }
    }

    async createCart() {
        let newId;
        if (this.carts.length > 0) {
            newId = this.carts[this.carts.length - 1].id + 1;
        } else {
            newId = 1;
        }

        const newCart = { id: newId, products: [] };
        this.carts.push(newCart);

        try {
            await this.saveCartsToFile(); 
            console.log('Carrito creado con éxito');
            return newCart;
        } catch (error) {
            console.error('Error al escribir el archivo', error);
            throw new Error('Error al crear carrito');
        }
    }

    async saveCartsToFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'));
        } catch (error) {
            console.error('Error al escribir el archivo', error);
            throw new Error('Error al guardar carritos en archivo');
        }
    }

    getCarts() {
        return this.carts;
    }

    async getCartById(id) {
        const cart = this.carts.find((cart) => cart.id === Number(id));
        return cart || null;
    }

    async addProductToCart(cartId, productId) {
        const productManager = new ProductManager('./src/data/products.json');
        const cart = await this.getCartById(cartId);
        if (!cart) {
            throw new Error('El carrito no existe');
        }
        const product = await productManager.getProductById(productId);
        if (!product) {
            throw new Error('El producto no existe');
        }
        const existingProduct = cart.products.find((p) => p.product === Number(productId));
        if (!existingProduct) {
            cart.products.push({ product: productId, quantity: 1 });
        } else {
            existingProduct.quantity += 1;
        }

        try {
            await this.saveCartsToFile();
            console.log('Producto agregado al carrito con éxito');
            return cart;
        } catch (error) {
            console.error('Error al escribir el archivo', error);
            throw new Error('Error al agregar producto al carrito');
        }
    }
}

export default CartManager;
