import { useState, useEffect } from 'react';

import api from './utils/api';

export const useProducts = () => {
  const [ loading, setLoading ] = useState(false);
  const [ products, setProducts ] = useState([]);

  const loadProducts = () => {
    setLoading(true);

    api.get('/api/products')
      .then(products => setProducts(products))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  useEffect(loadProducts, []);

  return [ loading, products, loadProducts ];
};

export const useNewProduct = ({ onCreated }) => {
  const [ loading, setLoading ] = useState(false);

  const createProduct = (product) => {
    setLoading(true);

    api.post('/api/products', product)
      .then(() => {
        onCreated(null);
        setLoading(false);
      })
      .catch((error) => {
        onCreated(error);
        setLoading(false);
      });
  };

  return [ loading, createProduct ];
};

export const useDeleteProduct = ({ onDeleted }) => {
  const [ loading, setLoading ] = useState(false);

  const deleteProduct = (name) => {
    setLoading(true);

    api.delete(`/api/products/${name}`)
      .then(() => {
        onDeleted(null);
        setLoading(false);
      })
      .catch((error) => {
        onDeleted(error);
        setLoading(false);
      });
  };

  return [ loading, deleteProduct ];
};

export const useEditProduct = ({ onUpdated }) => {
  const [ loading, setLoading ] = useState(false);

  const updateProduct = (name, data) => {
    setLoading(true);

    api.patch(`/api/products/${name}`, data)
      .then(() => {
        onUpdated(null);
        setLoading(false);
      })
      .catch((error) => {
        onUpdated(error);
        setLoading(false);
      });
  };

  return [ loading, updateProduct ];
};
