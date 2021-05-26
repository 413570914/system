import React, { Component } from 'react'

import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;

export default class Container extends Component {
    render() {
        return (
            <>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >

                    <div>
                    <React.Suspense fallback ={<div>页面加载中。。。。。。</div>}>
                        <Switch>
                            <Redirect exact from="/home/" to="/home/storelist" />
                            <Route path='/home/storelist' component={React.lazy(() => import('./container/Userlist'))} />
                                <Route path='/home/addstorelist' component={React.lazy(() => import('./container/AddUserlist '))} />
                                <Route path='/home/usercenter' component={React.lazy(() => import('./container/UserCenter'))} />
                            </Switch>
                        </React.Suspense>
                    </div>

                </Content>
            </>
        )
    }
}
