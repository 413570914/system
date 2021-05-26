import React, { Component } from 'react'
import Header from './Header'
import Sider from './Sider'
import Container from './Container'
import { Layout } from 'antd';

export default class Home extends Component {
    
    render() {
        return (
            <div>
                <Layout>
                   <Header/>
                    <Layout>
                        <Sider/>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Container/>
                        </Layout>
                    </Layout>
                </Layout>

            </div>
        )
    }
}
