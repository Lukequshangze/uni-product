// 用户相关接口
import http from '../request.js';
export default{
	// 登录接口
	login(params){
		return http.post("/api/user/login", params);
	}
}