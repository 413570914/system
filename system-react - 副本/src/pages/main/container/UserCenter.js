import React, { Component } from 'react'
import { Form, Input, Button, Select, Upload,message } from 'antd';
import apis from '../../../apis/user'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
export default class UserCenter extends Component {
    state = {
        fileList: []
    }
    async componentDidMount() {
        try {
            const data = await apis.my()
            console.log(data);
            if (data.code === 1) {
                const fileList = [{ uid: data.data.imgUrl, thumbUrl: `http://jacklv.cn/images/${data.data.imgUrl}` }]
                this.formIns.setFieldsValue({ account: data.data.account, userGroup: data.data.userGroup, upload: fileList });
                this.setState({ fileList });
            }
            console.log(this.state.fileList);
        } catch (error) {
            console.log(error);
        }
    }

    normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            this.setState({ fileList: e });
            return e;
        }
        this.setState({fileList:e.fileList});
        return e && e.fileList;
    };
    onFinish = async (values) => {
        console.log(values,"rrrrr");
        const params ={ imgUrl:values.upload[0].response.data,  account:values.account,
            userGroup:values.userGroup,	}
        const data = await apis.saveImg(params )
        if (data.code===1) {
            message.success('修改成功');
            const data = await apis.my()
            console.log(data);
            if (data.code === 1) {
                const fileList = [{ uid: data.data.imgUrl, thumbUrl: `http://jacklv.cn/images/${data.data.imgUrl}` }]
                this.formIns.setFieldsValue({ account: data.data.account, userGroup: data.data.userGroup, upload: fileList });
                this.setState({ fileList });
            }
        }
        console.log("data",data);
        console.log('Success:', values,params);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    render() {
        const { fileList } = this.state
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Form
                    {...layout}
                    name="basic"

                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    ref={ins => this.formIns = ins}
                >
                    <Form.Item
                        label="账号"
                        name="account"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="userGroup" label="角色" rules={[{ required: true }]}>
                        <Select disabled
                            placeholder=""
                            allowClear
                        >

                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="upload"
                        label="头像"
                        valuePropName="fileList"
                        getValueFromEvent={this.normFile}

                    >
                        <Upload name="avatar" action="http://jacklv.cn/users/uploadProfile"
                             headers={{
                                token: localStorage.token
                            }}
                            listType="picture-card">
                            {!fileList.length && '图片上传'}
                        </Upload>
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
