import { Table } from 'antd';
import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import Layout from '../../components/layout'
import { RoleType } from '../../constants/conType'
class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.dataSource = [{
      key: '1',
      username: 'luffy',
      email: 'luffy@126.com',
      role: 1
    }, {
      key: '2',
      username: 'naruto',
      email: 'naruto@126.com',
      role: 10
    }];
    this.columns = [{
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
      render: (text)=> (
        <Link href={`/user/userDetail?username=${text}`} as={`/user/userDetail/${text}`}>
          <a>{text}</a>
        </Link>
      )
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email'
    }, {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (text) => <span>{RoleType[text]}</span>
    }]
  }
  render() {
    return (
      <Layout title='list'>
        <Fragment>
          <h1>table</h1>
          <Table
            dataSource={this.dataSource}
            columns={this.columns}/>
        </Fragment>
      </Layout>
    )
  }
}

export default UserList;