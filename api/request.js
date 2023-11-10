const http = {
	baseUrl: "http://123.60.213.208:31009",
	
	// 请求方法
	request(config){
		config = beforeRequest(config);
		config.url = this.baseUrl + config.url;
		return new Promise((resolve,reject) => {
			uni.request(config).then(res=>{
				let [error, resp] = res
				const response = beforeRequest(resp)
				resolve(response)
			})
			.catch(err=>{
				errorHandle(err)
				reject(err)
			})
		})
	},
	get(url, data, auth){
		return this.request({
			url: url,		// 请求地址
			data: data,		// 请求参数
			auth: auth,     // 预留参数，请求是否需要token进行认证(turn / false)
			method: "GET"
		})
	},
	post(url, data, auth){
		return this.request({
			url: url,
			data: data,
			auth: auth,
			method: "POST"
		})
	},
	put(url, data, auth){
		return this.request({
			url: url,
			data: data,
			auth: auth,
			method: "PUT"
		})
	},
	delete(url, auth){
		return this.request({
			url: url,
			auth: auth,
			method: "DELETE"
		})
	}
}

// 请求拦截器
const beforeRequest = (config) => {
	console.log("请求拦截器", config);
	return config
}

// 响应拦截器
const beforeResponse = (response) =>{
	console.log("响应拦截器", response);
	return response
}

// 异常处理器
const errorHandle = (err) => {
	console.log("网络异常，请求失败!", err)
}

export default http