// // 首页相关接口
// import http from '../request.js';
// export default{
// 	// 初始化接口
// 	init(params){
// 		return http.post("/app/api/main/init", params);
// 	},
// 	// 获取列表数据
// 	getTableData(params){
// 		return http.post("/nativesphere/host/getHostList", params);
// 	},
// }



const http = uni.$u.http

// post请求，获取菜单
export const postMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)

// posts
export const getPosts = (data) => http.get('/posts', {params:data})
