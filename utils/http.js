// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
    // 初始化请求配置
	console.log("V",vm)
    uni.$u.http.setConfig((config) => {
        /* config 为默认全局配置*/
        config.baseURL = 'http://apptest.alianke.com:9098'; /* 根域名 */http://apptest.alianke.com/
        return config
    })
	
	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	console.log("C",config)
	    return config 
	}, config => { // 可使用async await 做异步操作
	    return Promise.reject(config)
	})
	
	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
		console.log("response",response)
		let isLogin = "";
		if(response.data.code === -100){
			isLogin = true;
		}
		if(isLogin === true){
				uni.showToast({
				    title: `账号未登录，请重新登录！`,
					icon: 'none',
				    duration: 1500
				});
				setTimeout(()=>{
					uni.redirectTo({
						url:"/pages/setting/login",
						// success() {
						// 	uni.navigateBack({
						// 		delta: 0
						// 	})
						// }
					})
				},1500)
				return;
		}
		const data = response.data
		return data === undefined ? {} : data
	}, (response) => { 
		// 对响应错误做点什么 （statusCode !== 200）
		console.log("response",response)
		return Promise.reject(response)
	})
}
