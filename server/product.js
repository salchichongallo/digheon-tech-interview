export default class Product {
  name = '';

  delivered = false;

  static _products = [];

  constructor(attributes = {}) {
    Object.assign(this, attributes);
  }

  static findAll() {
    return this._products;
  }

  static find(name) {
    const product = this._findByName(name);

    if (product) {
      return product;
    }

    throw new Error(`Product '${name}' not found.`);
  }

  static _findByName(name) {
    return this._products.find(product => product.name === name);
  }

  static create(attributes) {
    const product = new Product(attributes);

    if (this._exists(product)) {
      throw new Error(`Product '${attributes.name}' already exists.`);
    }

    this._products.push(product);

    return product;
  }

  static _exists(product) {
    return this._products.some(p => p.name === product.name);
  }

  update(attributes) {
    Object.assign(this, attributes);
  }

  delete() {
    const index = Product._products.indexOf(this);
    Product._products.splice(index, 1);
  }
}
