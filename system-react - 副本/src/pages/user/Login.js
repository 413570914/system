import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, notification } from 'antd';
import '../../assets/style/longin.scss'
// import axios from 'axios';
import apis from '../../apis/user'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
export default class login extends Component {
  state= {
    loading:false
  }
  onFinish = async (values) => {
    console.log('Success:', values,this.state.loading);
    this.setState({
      loading:true
    })
    const data = await apis.login(values)
    console.log(data);
    if (data.code===1) {
      localStorage.setItem("token",data.data.token)
      localStorage.setItem("path", '/home')
      this.props.history.push('/home');
    } else {
      notification.error({
        description: data.msg,
      })
      this.setState({
        loading:false
      })
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  toreg = () => {

    this.props.history.push('/user/reg');
  }
  // componentWillUnmount = () => {
  //   this.setState = (state,callback)=>{
  //     return;
  //   };
  // } //组件卸载不能更新state值，如遇到报错则可在卸载生命周期中将setstate return 出去
  render() {
    const { loading } = this.state;
    return (
      
      <>
        <div className="container">
          <Form
            {...layout}
            name="basic"

            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="账号"
              name="account"
              rules={[
                {
                  required: true,
                  message: '请输入账号',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout} >
              <Button type="primary" htmlType="submit"  loading={loading} >
                登录
        </Button>
              <div className="login" onClick={this.toreg}>没有账号，去注册</div>
            </Form.Item>
          </Form>
        </div>
      </>
    )
    

  }
}

