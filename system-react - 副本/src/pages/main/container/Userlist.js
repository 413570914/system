import React, { Component } from 'react'
import { Table, Space, Button, Popconfirm, message } from 'antd';
import apis from '../../../apis/user'
import moment from 'moment'

export default class Storelist extends Component {
    constructor(props) {
        super(); //初始化

    }
    state = {
        list: [],
        total: 0,
        pageSize: 10,
        pageNumber: 1,
        loading: false
    }

    getUsers = async () => {
        try {
            const data = await apis.getuser({
                pageSize: this.state.pageSize,
                pageNumber: this.state.pageNumber
            })
            this.setState({
                list: data.data.data,
                total: data.data.totalCount,
                loading: false
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    onchange = async (e) => {
        console.log(e, "e");
        const { current, pageSize } = e

        this.setState({
            loading: true,
            pageSize: pageSize,
            current: current
        })
        const data = await apis.getuser({
            pageSize: pageSize,
            pageNumber: current
        })
        this.setState({
            list: data.data.data,
            total: data.data.totalCount,
            loading: false
        })
    }
    //删除
    confirm =async (_id) => {
        console.log("id", _id);
        this.setState({
            loading: true, 
        })
        const data = await apis.del(_id)
        console.log(data);
        if (data.code===1) {
            message.success('删除成功');
            this.getUsers()
            this.setState({
                loading: false, 
            })
        } else {
            message.success(data.msg+', 删除失败，请联系管理员');
            this.setState({
                loading: false, 
            })
        }
        
    }
    cancel = (e) => {
        console.log(e);

        message.error('Click on No');
    }

    toAdd = () => {
        localStorage.setItem("key","/home/addstorelist")
        this.props.history.push('/home/addstorelist')
        console.log(this.props)
    }



    render() {
        const { list, total } = this.state
        const show = {
            total: total,
            defaultCurrent: 1,

        }
        const columns = [
            {
                align: "center",
                title: '账号',
                dataIndex: 'account',
                key: 'account',
                // eslint-disable-next-line
                // render: text => <a>{text}</a>,
            },
            {
                align: "center",
                title: '管理员类别',
                dataIndex: 'userGroup',
                key: 'userGroup',
            },
            {
                align: "center",
                title: '创建日期',
                dataIndex: 'createDate',
                key: 'createDate',
                render: (text, record) => {
                    return moment(text).format('YYYY-MM-DD, h:mm:ss')
                },//text:当前对象下的属性值，record:当前这个对象
            },
            {
                align: "center",
                title: '头像',
                dataIndex: 'imgUrl',
                key: 'imgUrl',
               
                render: (text,record) =>
            <img alt="" src={`http://jacklv.cn/images/${text}` }style={ {width:40,height:40}}></img>
             },

            {
                align: "center",
                
                title: '操作',
                key: 'action',
                // eslint-disable-next-line
                render: (text, record) => (<Space size="middle">     <Button onClick={ this.toAdd} type="primary">添加</Button>
                    <Popconfirm title="确认删除?"
                        onConfirm={() => this.confirm(record._id)}
                        onCancel={this.cancel}
                        okText="确定"
                        cancelText="取消">
                        <Button type="primary" >删除</Button>
                    </Popconfirm>

                </Space>
                ),
            },
        ];

        return (
            <div>
                <Table rowKey="_id" loading={this.state.loading} columns={columns} dataSource={list} pagination={show} onChange={this.onchange} />

            </div>
        )

    }
   componentDidMount() {
       this.getUsers()

    }

}
