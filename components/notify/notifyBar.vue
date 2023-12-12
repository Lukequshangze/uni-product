<template>
	  <view>
	    <view class="content-notify">
	    	<image class="notify-image" src="@/static/icon/notify-bring.png" mode=""></image>
	    	<image class="notify-image" src="@/static/icon/notify-claim.png" mode="" @click="toBringPage"></image>
	    </view>
		<view class="clear-both">
			
		</view>
	  </view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods: {
			toBringPage() {
				uni.navigateTo({
					url: "/pages/bring/index"
				})
			},
			// 获取消息数量
			getMsgNumber() {
				let params = {
					_tk:uni.getStorageSync("wp_token")
				}
				uni.$u.http.get('/app/api/main/mes/list', params).then(res => {
					if(res.code == 0){
						
					}
				}).catch((err) =>{
					console.log("err",err)
				})
			},
		},
		created(){
			// this.getMsgNumber();
		},
	}
</script>

<style lang="scss" scoped>
	.content-notify{
		float:right;
		.notify-image {
			height: 20px;
			width: 20px;
			padding: 2px 10px 0 0;
		}
	}
	.clear-both{
		clear:both;
	}
</style>