import React, { useState, } from 'react';
import { Modal, message } from 'antd';

import AppTemplate from './components/AppTemplate';
import ProductsTable from './components/ProductsTable';
import ProductActions from './components/ProductActions';
import NewProductForm from './components/NewProductForm';
import { useProducts, useNewProduct, useDeleteProduct, useEditProduct } from './hooks';

const App = () => {
  const [ showingForm, setShowingForm ] = useState(false);
  const showForm = () => setShowingForm(true);
  const hideForm = () => setShowingForm(false);

  const [ loading, products, loadProducts ] = useProducts();

  const onCreated = error => {
    hideForm();

    if (!error) {
      loadProducts();
      message.success('Product created');
    }
  };
  const [ creating, createProduct ] = useNewProduct({ onCreated });

  const onDeleted = error => {
    if (!error) {
      loadProducts();
      message.info('Product deleted');
    }
  };
  const [ deleting, deleteProduct ] = useDeleteProduct({ onDeleted });

  const [ product, setProduct ] = useState({});
  const [ showingEditing, setEditing ] = useState(false);
  const startEditing = product => {
    setProduct(product);
    setEditing(true);
  };
  const stopEditing = () => {
    setProduct({});
    setEditing(false);
  };
  const onUpdated = error => {
    stopEditing();

    if (!error) {
      loadProducts();
      message.info('Product updated');
    }
  };
  const [ updating, editProduct ]  = useEditProduct({ onUpdated });

  return (
    <AppTemplate title="Products">
      <ProductActions onStartCreating={showForm} onLoadProducts={loadProducts} />

      <ProductsTable
        products={products}
        onEdit={startEditing}
        onDelete={deleteProduct}
        loading={loading || deleting || updating}
      />

      {showingForm && !updating && (
        <Modal visible onCancel={hideForm} title="Create Product" footer={false}>
          <NewProductForm
            autoFocus
            loading={creating}
            title="Create Product"
            onProduct={createProduct}
          />
        </Modal>
      )}

      {showingEditing && !showingForm && (
        <Modal visible onCancel={stopEditing} title="Update Product" footer={false}>
          <NewProductForm
            autoFocus
            product={product}
            loading={updating}
            title="Update Product"
            onProduct={data => editProduct(product.name, data)}
          />
        </Modal>
      )}
    </AppTemplate>
  );
};

export default App;
