// 对 aixos 进一步的封装处理
import axios from 'axios';

// 在原生的 axios 基础之上，创建一个新的 axios 实例
const myAxios = axios.create({
    // axios 的 url 基础路径
    // baseURL: 'http://localhost:3000',
    // baseURL: 'http://localhost:3000',
    // 超时时间设置
    timeout: 5000
});
let showMsg = true;
// 配置 myAxios 的请求拦截器：主要用于 token 的添加
myAxios.interceptors.request.use((config) => {
    // 拦截成功，给请求头添加 token
    const token = localStorage.token;
    config.headers.token = token;
    return config;
}, (err) => {
    // 拦截失败
    return err;
});

// 配置 myAxios 的响应拦截器：主要用于后端相应报错处理
myAxios.interceptors.response.use((res) => {
    console.log("拦截器",res.data)
    // 响应成功,将res响应数据里的data暴露出去
    return res.data;
}, (err) => {
    // 响应失败，处理失败对象
    if (err && err.response) {
        // 对错误类型进行判读
        switch (err.response.status) {
            case 400: err.message = '请求错误(400)'; break;
            case 401:
                err.message = '身份认证失败(401)';
                // alert('你还未登录，请先登录');
                if(showMsg) {
                    alert("登录已过期，确定返回登录页面")
                    showMsg = false
                    localStorage.clear()//q清空本地存储
                    setTimeout(() => {
                      showMsg = true;
                    }, 3000);
                  }
                // localStorage.clear()//q清空本地存储
                window.location.hash = "#/user/login"; 
                break;
            case 403: err.message = '拒绝访问(403)'; break;
            case 404: err.message = '请求出错(404)'; break;
            case 408: err.message = '请求超时(408)'; break;
            case 500: err.message = '服务器错误(500)'; break;
            case 501: err.message = '服务未实现(501)'; break;
            case 502: err.message = '网络错误(502)'; break;
            case 503: err.message = '服务不可用(503)'; break;
            case 504: err.message = '网络超时(504)'; break;
            case 505: err.message = 'HTTP版本不受支持(505)'; break;
            default: err.message = `连接出错(${err.response.status})!`;
        }
        return {
            code: 0,
            status: err.response.status,
            message: err.message
        }
    }
    return {
        code: 0,
        message: '服务器连接失败'
    }
});

export default myAxios;