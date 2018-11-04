import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Form, Input } from 'antd';

const FormItem = Form.Item;

const NewProductForm  = ({ loading, onProduct, title, product = {}, autoFocus = false, form }) => {
  const { getFieldDecorator } = form;

  const nameDecorator = getFieldDecorator('name', {
    initialValue: product.name || '',
    rules: [{
      required: true,
      message: 'Product name is required',
    }],
  })
  const deliveredDecorator = getFieldDecorator('delivered', {
    valuePropName: 'checked',
    initialValue: product.delivered || false,
  });

  const handleSubmit = event => {
    event.preventDefault();

    form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        onProduct(values);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} style={{ maxWidth: 200, margin: '0 auto' }}>
      <FormItem label="Name">
        {nameDecorator(<Input autoFocus={autoFocus} placeholder="Product name" />)}
      </FormItem>

      <FormItem>
        {deliveredDecorator(<Checkbox>Delivered?</Checkbox>)}
      </FormItem>

      <FormItem>
        <Button loading={loading} type="primary" htmlType="submit">
          {loading ? 'Loading' : title }
        </Button>
      </FormItem>
    </Form>
  );
}

NewProductForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onProduct: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  product: PropTypes.object,
  autoFocus: PropTypes.bool,

  form: PropTypes.any.isRequired,
};

export default Form.create()(NewProductForm);
