<template>
	<!-- 修改密码    密码校验还未添加-->
	<view>
		<NoticeBar v-if="notifyShow" ref="noticeRef"/>
		<view class="content">
			<u--form labelPosition="left" :model="formData" ref="uForm" labelWidth="130">
				<u-form-item label="接收新消息通知:" prop="formData.receiveNotify" borderBottom ref="item1">
					<view class="" style="display: flex;justify-content: space-between;width: 100%;">
						<view class=""></view>
						<u-switch v-model="formData.receiveNotify" @change="receiveNotifyChange"></u-switch>
					</view>
				</u-form-item>
				<u-form-item label="消息铃声设置" prop="formData.newPassWord" borderBottom ref="item1"
					@click="claimNotifySetting">
					<view class="" style="display: flex;justify-content: space-between;width: 100%;">
						<view class=""></view>
						<view class="" style="display: flex;justify-content: space-between">
							<view class="" style="color: #aaa;margin-left: 20px;"> >>> </view>
						</view>
					</view>
				</u-form-item>
			<!-- 	<u-form-item label="当前默认铃声" prop="formData.newPassWord" borderBottom ref="item1"
				@click="bringNotifySetting">
					<view class="" style="display: flex;justify-content: space-between;width: 100%;">
						<view class=""></view>
						<view class="" style="display: flex;justify-content: space-between">
							<view class="">叮咚</view>
						</view>
					</view>
				</u-form-item> -->
				<!-- 点击修改厚的模态框 -->
			</u--form>
			<!-- 底部导航栏组件 -->
			<customTabBar></customTabBar>
		</view>
	</view>
</template>

<script>
	import customTabBar from "@/components/tabbar/tabbar.vue";
	import NoticeBar from "@/components/notify/notifyBar.vue";
	export default {
		data() {
			return {
				formData: {
					receiveNotify: "",
					newPassWord: "",
					confirmPassword: "",
				},
				notifyShow: true,
				modalShow: false,
				modalTitle: '提示',
				modalContent: '确认是否修改？',
				timer: null,
			}
		},
		components: {
			customTabBar,
			NoticeBar
		},
		onShow() {

		},
		onLoad() {

		},
		methods: {
			receiveNotifyChange(e) {
				console.log("e", e);
				this.notifyShow = false;
				this.notifyShow = true;
				if(e===true){
					uni.setStorageSync("wp_open_notify",true);
				}else{
					uni.setStorageSync("wp_open_notify",false);
				}
			},

			// 认领消息通知
			claimNotifySetting() {
				uni.getSystemInfo({
					success(res) {
						if (res.platform == 'ios') {
							plus.runtime.openURL("app-settings://");
						} else if (res.platform == 'android') {
							var main = plus.android.runtimeMainActivity();
							var Intent = plus.android.importClass("android.content.Intent");
							var mIntent = new Intent('android.settings.SOUND_SETTINGS');
							main.startActivity(mIntent);
							console.log("main",main) 
							console.log("plus",plus)
						}
					}
				});
			},
			// 调用消息组件中的方法
			getNoticeData(){
				this.$refs.noticeRef.getMsgNumber();
			}
		},
		mounted() {
			// 循环消息事件
			let that = this;
			that.getNoticeData();
			console.log("that.$refs.noticeRef",that.$refs.noticeRef)
			that.timer = setInterval( () => { 
				that.getNoticeData();
			}, 5000);	
		},
		onHide() {
			if(this.timer){
				clearInterval(this.timer);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 10px;
	}
</style>