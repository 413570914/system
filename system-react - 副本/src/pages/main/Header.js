import React, { Component } from 'react'
import { Layout, Menu, Modal } from 'antd';
import { withRouter } from 'react-router-dom'
import apis from '../../apis/user'

const { Header } = Layout;

class Heade extends Component {

    state = {
        isModalVisible: false
    }
    clickmenu = (params) => {
        console.log(params);
        const { key } = params
        switch (key) {
            case "user-center":
                localStorage.setItem('key', key)
                this.props.history.push("/home/usercenter")
                break;
            case "loginout":
                this.setState({
                    isModalVisible: true
                })


                break;
            default:
                break;
        }
    }
    handleOk = () => {
        console.log();
        localStorage.clear()
        this.props.history.replace("/user/login")
    }
    handleCancel = () => {
        this.setState({
            isModalVisible: false
        })
    }

   
   async componentDidMount() {
       try {
           const data = await apis.my()
           if (data.code===1) {
            this.setState({
                myinfo:data.data
            })   
           }
     
       } catch (error) {
        console.log(error);  
       }
     
    }
    state = {
      myinfo:{}
    }
    render() {
        const defaultSelectedKeys = localStorage.getItem('key');
        const { isModalVisible } = this.state
        return (
            <Header className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="logo" style={{ fontStyle: 'italic', fontSize: 40, color: '#fff', display: "flex", alignItems: "center" }} >
                    <span >蜗牛商城</span>
                    <span style={{ fontSize: 20, margin: '0 20px' }} >欢迎您：{ this.state.myinfo.account}</span>

                    <img src={`http://jacklv.cn/images/${ this.state.myinfo.imgUrl}` } alt="" style={{ width: 64, height: 64 ,borderRadius:'50%'}} />
                </div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[defaultSelectedKeys]} onClick={this.clickmenu}>

                    <Menu.Item key="user-center">个人中心</Menu.Item>
                    <Menu.Item key="loginout" >注销</Menu.Item>
                </Menu>
                <Modal title="提示" visible={isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <p style={{ textAlign: 'center' }}>注销当前账号</p>

                </Modal>
            </Header>
        )
    }
}
export default withRouter(Heade)
