import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const ProductActions = ({ onStartCreating, onLoadProducts }) => (
  <div style={{ marginBottom: 16, display: 'flex' }}>
    <Button onClick={() => onStartCreating()} type="primary" icon="plus">
      Create product
    </Button>
    <div style={{ flex: 1 }} />
    <Button
      icon="reload"
      shape="circle"
      title="Reload products"
      onClick={() => onLoadProducts()}
    />
  </div>
);

ProductActions.propTypes = {
  onStartCreating: PropTypes.func.isRequired,
  onLoadProducts: PropTypes.func.isRequired,
};

export default ProductActions;
