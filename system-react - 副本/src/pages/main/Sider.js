import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Sider } = Layout;




class Siders extends Component {
    cheackmenu = (params) => {
        console.log(params, this.props.history);
        const [key,subMenukey] = params.keyPath
        localStorage.setItem('key', key)
        if (subMenukey) {
            localStorage.setItem('subMenukey', subMenukey)
        }
        this.setState({
            key:key
        })
        this.props.history.push(key);
    }
    render() {
        const defaultSelectedKey = localStorage.getItem('key') || "/home/storelist"
        const defaultOpenKey =localStorage.getItem('subMenukey')
        return (
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[defaultSelectedKey]}
                    defaultOpenKeys={[defaultOpenKey]}
                    style={{ height: '100%', borderRight: 0 }}
                    onClick={this.cheackmenu}
                >
                    <Menu.Item key="/home/storelist">首页</Menu.Item>
                    <Menu.Item key="2">订单管理</Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="账号管理">
                        <Menu.Item key="/home/storelist">账号列表</Menu.Item>
                        <Menu.Item key="/home/addstorelist">添加账号</Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="店铺管理">
                        <Menu.Item key="5">店铺列表</Menu.Item>
                        <Menu.Item key="6">添加店铺</Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="商品管理">
                        <Menu.Item key="9">商品列表</Menu.Item>
                        <Menu.Item key="10">添加商品</Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub4" icon={<NotificationOutlined />} title="销售统计">
                        <Menu.Item key="9">订单统计</Menu.Item>
                        <Menu.Item key="10">商品统计</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}
export default withRouter(Siders)
