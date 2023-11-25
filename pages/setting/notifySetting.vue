<template>
	<!-- 修改密码    密码校验还未添加-->
	<view>
		<NoticeBar />
		<view class="content">
			<u--form labelPosition="left" :model="formData" :rules="rules" ref="uForm" labelWidth="130">
				<u-form-item label="接收新消息通知:" prop="formData.receiveNotify" borderBottom ref="item1">
					<view class="" style="display: flex;justify-content: space-between;width: 100%;">
						<view class=""></view>
						<u-switch v-model="formData.receiveNotify" @change="receiveNotifyChange"></u-switch>
					</view>
				</u-form-item>	
				<u-form-item label="消息铃声设置:" prop="formData.newPassWord" borderBottom ref="item1">
					<view class="" style="display: flex;justify-content: space-between;width: 100%;">
						<view class=""></view>
						<view class="" style="color: #aaa;"> >>> </view>
					</view>
				</u-form-item>	
				<u-form-item label="当前默认铃声:" prop="formData.confirmPassword" borderBottom ref="item1">
					<view class="" style="display: flex;justify-content: space-between;width: 100%;">
						<view class=""></view>
						<view class="" style="color: #aaa;"> 夜曲 </view>
					</view>
				</u-form-item>
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
				formData:{
					receiveNotify:"",
					newPassWord:"",
					confirmPassword:"",
				},
				
				modalShow:false,
				modalTitle:'提示',
				modalContent:'确认是否修改？'
			}
		},
		components:{
			customTabBar,
			NoticeBar
		},
		onShow() {
			
		},
		onLoad() {

		},
		methods: {
			receiveNotifyChange(e){
				console.log("e",e);
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 10px;
	}
</style>
