<script>
	export default {
		onLaunch: function() {
			uni.hideTabBar();
			console.log('App Launch')
			// 判断是否登录
			let token= uni.getStorageSync("wp_token");
			if (token) {
				    //存在则关闭启动页进入首页
					plus.navigator.closeSplashscreen();
			    } else {
					//不存在则跳转至登录页
			        uni.reLaunch({
			            url: "/pages/setting/login",
					    success: () => {
					        plus.navigator.closeSplashscreen();
					    }
			    	})
			    }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	.content{
		padding:0px 5px 55px 5px;
	}
</style>
