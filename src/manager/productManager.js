import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];

        if (fs.existsSync(this.path)) {
            try {
                this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            } catch (error) {
                console.error('Error al leer el archivo', error);
                this.products = [];
            }
        } else {
            this.products = [];
        }
    }

    async addProduct(product) {
        // Generar nuevo ID autoincremental
        let newId = 0;
        if (this.products.length > 0) {
            newId = this.products[this.products.length - 1].id + 1;
        } else {
            product.id = 1;
        }

        const newProduct = {
            id: newId,
            status: true,
            ...product
        };

        this.products.push(newProduct);

        try {
            await this.saveProductsToFile(); // Guardar productos en archivo
            console.log('Producto agregado con éxito');
            return newProduct;
        } catch (error) {
            console.error('Error al escribir el archivo', error);
            throw new Error('Error al agregar el producto');
        }
    }

    async saveProductsToFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
        } catch (error) {
            console.error('Error al escribir el archivo', error);
            throw new Error('Error al guardar productos en archivo');
        }
    }

    async getProducts(limit) {
        const productLimit = this.products.slice(0, limit);
        return productLimit;
    }

    getProductById(idProduct) {
        const product = this.products.find((product) => product.id === Number(idProduct));
        return product || null;
    }

    async deleteProduct(idProduct) {
        const index = this.products.findIndex((product) => product.id === Number(idProduct));
        if (index !== -1) {
            this.products.splice(index, 1);
            try {
                await this.saveProductsToFile();
                console.log('Producto eliminado exitosamente');
                return true;
            } catch (error) {
                console.error('Error al escribir el archivo', error);
                throw new Error('Error al eliminar producto');
            }
        }
        return false;
    }

    async updateProduct(idProduct, updatedProduct) {
        const index = this.products.findIndex((product) => product.id === Number(idProduct));
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };
            try {
                await this.saveProductsToFile();
                console.log('Producto actualizado exitosamente');
                return this.products[index];
            } catch (error) {
                console.error('Error al escribir el archivo', error);
                throw new Error('Error al actualizar producto');
            }
        }
        return null;
    }
}

export default ProductManager;
