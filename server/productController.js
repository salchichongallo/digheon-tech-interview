import Product from './product';

const delay = (fn) => setTimeout(fn, 700);

export const findAll = (_, res) => res.status(200).json(Product.findAll());

export const find = (req, res) => {
  try {
    const { name } = req.params;
    const product = Product.find(name);
    res.status(200).json(product);
  } catch (error) {
    res.statusMessage = error.message;
    res.status(404).json({ error: error.message });
  }
};

export const create = (req, res) => {
  try {
    const data = req.body;
    const product = Product.create(data);
    delay(() => res.status(201).json(product));
  } catch (error) {
    res.statusMessage = error.message;
    res.status(409).json({ error: error.message });
  }
};

export const update = (req, res) => {
  let product;

  try {
    const { name } = req.params;
    product = Product.find(name);
  } catch (error) {
    res.statusMessage = error.message;
    return res.status(404).json({ error: error.message });
  }

  const data = req.body;
  product.update(data);

  delay(() => res.status(204).end());
};

export const deleteProduct = (req, res) => {
  let product;

  try {
    const { name } = req.params;
    product = Product.find(name);
  } catch (error) {
    res.statusMessage = error.message;
    return res.status(404).json({ error: error.message });
  }

  product.delete();

  res.status(204).end();
};
