import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'antd';

const ProductsTable = ({ loading, onEdit, onDelete, products }) => {
  const columns = [{
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    key: 'delivered',
    title: 'Delivered',
    dataIndex: 'delivered',
    render: delivered => delivered ? 'Yes' : 'No',
  }, {
    key: 'actions',
    title: 'Actions',
    dataIndex: 'actions',
    render: (_, record) => (
      <>
        <Button onClick={() => onEdit(record)} icon="edit" style={{ marginRight: 8 }}>
          Edit
        </Button>
        <Button onClick={() => onDelete(record.key)} icon="delete" type="danger">
          Delete
        </Button>
      </>
    ),
  }];

  return (
    <Table
      loading={loading}
      columns={columns}
      pagination={false}
      dataSource={products.map(p => ({...p, key: p.name }))}
    />
  );
};

ProductsTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductsTable;
