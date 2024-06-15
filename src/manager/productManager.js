const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor() {
    this.filePath = path.resolve(__dirname, '../../data/products.json');
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
  }

  getAll(limit) {
    return limit ? this.products.slice(0, limit) : this.products;
  }

  getById(id) {
    return this.products.find(product => product.id === id);
  }

  create(productData) {
    const newProduct = {
      id: (this.products.length ? this.products[this.products.length - 1].id + 1 : 1).toString(),
      ...productData,
      status: productData.status !== undefined ? productData.status : true
    };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  update(id, productData) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...productData };
      this.saveProducts();
      return this.products[index];
    }
    return null;
  }

  delete(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      return true;
    }
    return false;
  }
}

module.exports = new ProductManager();
