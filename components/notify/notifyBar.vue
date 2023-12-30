<template>
	  <view>
	    <view class="content-notify">
			<view class=""></view>
	    	<view class="" style="display: flex;margin-right: 10px;">
				<!-- 认领 -->
				<view class="notify-box">
					<image class="notify-image" src="@/static/icon/notify-bring.png" mode="" @click="toCapPage"></image>
					<text class="notify-num">{{ claimMsgNum ? claimMsgNum : 0 }}</text>
				</view>
				<!-- 带入 -->
				<view class="notify-box">
					<image class="notify-image" src="@/static/icon/notify-claim.png" mode="" @click="toBringPage"></image>
					<text class="notify-num" style="margin-right: 0px;">{{ bringMsgNum ? bringMsgNum : 0 }}</text>
				</view>
				
				<!-- 删除 -->
				<!--<view class="" style="margin-left: 10px;margin-top: 5px">
					<u-button @click="add" size="mini">认领+1</u-button>
				</view>
				<view class="" style="margin-left: 5px;margin-top: 5px;">
					<u-button @click="addb" size="mini">带入+1</u-button>
				</view> -->
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
				bringMsgNum: null,   // 带入消息数量
				claimMsgNum: null,   // 认领消息数量
				wp_open_notify: true,
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
								this.wp_open_notify = uni.getStorageSync("wp_open_notify");
							})
						}
					}
				}).catch((err) =>{
					this.$api.msg("加载失败");
					//隐藏加载框
					uni.hideLoading();
				})
			},
			// add(){
			// 	this.claimMsgNum += 1;
			// 	this.wp_open_notify = uni.getStorageSync("wp_open_notify");
			// },
			// addb(){
			// 	this.bringMsgNum += 1;
			// 	this.wp_open_notify = uni.getStorageSync("wp_open_notify");
			// },
			claimNotify(){
				console.log("认领1")
				let main = plus.android.runtimeMainActivity();
				let RingtoneManager = plus.android.importClass("android.media.RingtoneManager");
				let uri = RingtoneManager.getActualDefaultRingtoneUri(main, RingtoneManager
													.TYPE_NOTIFICATION);
				let MediaPlayer = plus.android.importClass("android.media.MediaPlayer");
				let player = MediaPlayer.create(main, uri);
				player.setLooping(false);
				player.prepare();
				player.start();
			},
		},
		watch: {
			"claimMsgNum"(newVal,oldVal){
				if(newVal && oldVal){
					if(newVal > oldVal && this.wp_open_notify === true){
						this.claimNotify();
					}
				}
			},
			"bringMsgNum"(newVal,oldVal){
				if(newVal && oldVal){
					if(newVal > oldVal && this.wp_open_notify === true){
						this.claimNotify();
					}
				}
			}
		},
		created(){
			// this.getMsgNumber();
			this.wp_open_notify = uni.getStorageSync("wp_open_notify");
		},
	}
</script>

<style lang="scss" scoped>
	.content-notify{
		display: flex;
		justify-content: space-between;
		.notify-box{
			min-width: 60px;
			.notify-image {
				height: 23px;
				width: 23px;
				padding: 2px 10px 0 0;
			}
			.notify-num{
				position: relative;
				left: -20px;
				top: -2px;
				border-radius: 20px;
				font-size: 10px;
				padding: 0 3px;
				color: #fff;
				background: #fff;
				z-index: 2;
				min-width: 20px;
				text-align: center;
				display: inline-block;
				background: rgb(245, 108, 108);
			}
		}
	}
	.clear-both{
		clear:both;
	}
</style>