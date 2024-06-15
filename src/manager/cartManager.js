const fs = require('fs');
const path = require('path');

const cartsFilePath = path.join(__dirname, '../data/carts.json');

const readCarts = () => {
  const data = fs.readFileSync(cartsFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeCarts = (carts) => {
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
};

class CartManager {
  static getById(id) {
    const carts = readCarts();
    return carts.find(c => c.id === id);
  }

  static addProductToCart(cartId, productId) {
    const carts = readCarts();
    const cart = carts.find(c => c.id === cartId);

    if (!cart) {
      return null;
    }

    const cartProduct = cart.products.find(p => p.product === productId);

    if (cartProduct) {
      cartProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    writeCarts(carts);
    return cart;
  }
}

module.exports = CartManager;
