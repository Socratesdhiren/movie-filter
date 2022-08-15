import React from "react";
import { Layout, Menu } from "antd";
import "./layout.css";

const { Header, Content, Footer } = Layout;

const DesignLayout = ({ children }) => {
  return (
    <Layout className="layout">
     
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default DesignLayout;
