import React, { Component } from 'react'
import apis from '../../../apis/user'
import { Form, Input, Button, Select,message } from 'antd';
const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {    
    wrapperCol: { offset: 8, span: 16 },
};
export default class AddStorelist extends Component {
    onFinish = async (values) => {
        try {
            const data = await apis.addUser(values)
            console.log("data",data);
            if (data.code===1) {
                message.success('账号' + data.data.account + '添加成功');
                this.formIns.resetFields(['account','Password','userGroup'])
            } else {
                message.error(data.msg);
            }  
        } catch (error) {
            console.log(error);
        }
       
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    style={{ width: 400 }}
                    ref={formIns => this.formIns = formIns}
                    autoComplete="off"
                >
                    <Form.Item
                        label="账户名"
                        name="account"
                        rules={[{ required: true, message: '请输入账号!' }]}
                    >
                        <Input placeholder="请输入账号"  />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password placeholder="请输入密码" type='password' autoComplete="new-password"/>
                    </Form.Item>

                    <Form.Item
                        label="角色"
                        name="userGroup"
                        rules={[{ required: true, message: '请选择角色!' }]}
                    >
                        <Select
                            placeholder="请选择角色"
                            //   onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="超级管理员">超级管理员</Option>
                            <Option value="普通管理员">普通管理员</Option>
                        
                        </Select>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                          提交
              </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
