<template>
	<view class="content">
		<NoticeBar ref="noticeRef" />
		<u-cell-group style="margin-top: 10px">
			<u-cell
			    :title="nickName"
			></u-cell>
			<u-cell
			    title="修改密码"
			    isLink
			    url="/pages/setting/updatePassword"
			></u-cell>
			<u-cell
			    title="消息通知"
			    isLink
			    url="/pages/setting/notifySetting"
			></u-cell>
	<!-- 		<u-cell
			    title="切换账号"
			    isLink
			    url="/pages/componentsB/badge/badge"
			></u-cell> -->
			<u-cell
			    title="退出"
			    isLink
			    @click="openLoginOut"
			></u-cell>
		</u-cell-group>
		
		<!-- 登出模态框 -->
		<u-modal :show="logoutModel" :content='removeContent' @confirm="logoutConfirm" @cancel="logoutCancel" showCancelButton></u-modal>
		<!-- 底部导航栏组件 -->
		<customTabBar></customTabBar>
	</view>
</template>

<script>
	import customTabBar from "@/components/tabbar/tabbar.vue";
	import NoticeBar from "@/components/notify/notifyBar.vue";
	export default {
		data() {
			return {
				title: '设置',
				logoutModel: false,
				removeContent: "确认退出登录？",
				timer: null,
				nickName: ""
			}
		},
		components:{
			customTabBar,
			NoticeBar
		},
		onShow() {
			this.$store.commit("changeTabbarIndex",3);
		},
		onLoad() {

		},
		methods: {
			openLoginOut(){
				this.logoutModel = true;
			},
			logoutConfirm(){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
				}
				uni.$u.http.post('/app/oauth/api/logout', params).then(res => {
					if(res.code == 0){
						this.logoutModel = false;  // 关闭model框
						uni.navigateTo({
							url: "/pages/setting/login"
						})
					}else{
						this.logoutModel = false;
						this.$api.msg(res.msg);
					}
				}).catch((err) =>{
					this.$api.msg(err);
				})
			},
			logoutCancel(){
				this.logoutModel = false;
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
		created() {
			this.nickName = uni.getStorageSync("wp_account");
		},
		onHide() {
			if(this.timer){
				clearInterval(this.timer);
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
