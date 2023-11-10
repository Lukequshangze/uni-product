// 首页相关接口
import http from '../request.js';
export default{
	// 获取列表数据
	getTableData(params){
		return http.post("/nativesphere/host/getHostList", params);
	}
}