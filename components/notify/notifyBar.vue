<template>
	  <view>
	    <view class="content-notify">
			<view class=""></view>
	    	<view class="" style="display: flex;">
				<!-- 认领 -->
				<view class="">
					<text class="notify-num">{{ claimMsgNum }}</text>
					<image class="notify-image" src="@/static/icon/notify-bring.png" mode="" @click="toCapPage"></image>
				</view>
				<!-- 带入 -->
				<view class="" style="margin-left: 20px;">
					<text class="notify-num">{{ bringMsgNum }}</text>
					<image class="notify-image" src="@/static/icon/notify-claim.png" mode="" @click="toBringPage"></image>
				</view>
	    	</view>
	    </view>
		<view class="clear-both">
			
		</view>
	  </view>
</template>

<script>
	export default {
		data(){
			return {
				msgList: [],
				bringMsgNum: 0,   // 带入消息数量
				claimMsgNum: 0,   // 认领消息数量
			}
		},
		methods: {
			toCapPage() {
				uni.navigateTo({
					url: "/pages/home/index"
				})
			},
			toBringPage() {
				uni.navigateTo({
					url: "/pages/home/bringContent"
				})
			},
			// 获取消息数量
			getMsgNumber() {
				let params = {
					_tk: uni.getStorageSync("wp_token"),
				}
				uni.$u.http.post('/app/api/main/mes/list', params).then(res => {
					if(res.code == 0){
						this.msgList = res.data;
						if(this.msgList && this.msgList.length > 0){
							this.msgList.forEach(item=>{
								if(item.business == 1){   // 1：加入申请，2:携带申请 |
									this.claimMsgNum = item.mesc;
								}else if(item.business == 2){
									this.bringMsgNum = item.mesc;
								}
							})
						}
					}
				}).catch((err) =>{
					this.$api.msg("加载失败");
					//隐藏加载框
					uni.hideLoading();
				})
			},
		},
		created(){
			this.getMsgNumber();
		},
	}
</script>

<style lang="scss" scoped>
	.content-notify{
		display: flex;
		justify-content: space-between;
		.notify-image {
			height: 23px;
			width: 23px;
			padding: 2px 10px 0 0;
		}
		.notify-num{
			position: relative;
			left: 6px;
			top: -2px;
			border: 1px solid #f50d0d;
			border-radius: 20px;
			font-size: 10px;
			padding: 0 3px;
			color: #f50d0d;
			background: #fff;
			z-index: 2;
			min-width: 12px;
			text-align: center;
			display: inline-block;
		}
	}
	.clear-both{
		clear:both;
	}
</style>