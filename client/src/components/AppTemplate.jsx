import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

const { Content } = Layout;

const AppTemplate = ({ title, children }) => (
  <Layout className="App">
    <h1 className="App__title">
      {title}
    </h1>

    <Content className="App__content">
      {children}
    </Content>
  </Layout>
);

AppTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AppTemplate;
