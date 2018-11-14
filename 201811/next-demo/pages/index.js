import { Button } from 'antd';
import React, { Fragment } from 'react';
import Link from 'next/link'
import Layout from '../components/layout'
const Home = () => (
  <Layout title='首页'>
    <Fragment>
      <h1>我是Next的首页</h1>
      <Link href="/user/userList">
        <Button>userLink</Button>
      </Link>
      <style jsx>{`
        .ant-btn-primary {
          background-color: #ec6a00
        }
      `}</style>
    </Fragment>
  </Layout>
);
export default Home;