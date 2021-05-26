import axios from './myAxios'

// eslint-disable-next-line 
export default {
	//登录
	login(data) {
		return axios({
			url: '/users/login',
			method: 'post',
			data
		})
	},
	//获取账号列表
	getuser(data) {
		return axios({
			url: '/users/getAccountList',
			method: 'post',
			data
		})
	},

	//删除账号
	del(data) {
		return axios({
			url: '/users/delAccount?id=' + data,
			method: 'delete',
			data
		})
	},
	//添加账号
	addUser(data) {
		return axios({
			url: '/users/addOrEditAccount',
			method: 'post',
			data
		})
	},
	//获取当前登录人信息
	my() {
		return axios({
			url: '/users/getUserInfo',
			method: 'get',

		})
	},
	//保存当前信息
	saveImg(data) {
		return axios({
			
			url: '/users/saveUserInfo',
			method: 'post',
			data
		})
	}
}