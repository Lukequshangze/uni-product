<template>
	<!-- 修改密码    密码校验还未添加-->
	<view class="content">
		<NoticeBar />
		<u--form labelPosition="left" :model="formData" :rules="rules" ref="uForm" labelWidth="90">
			<u-form-item label="原密码:" prop="formData.oldPassWord" borderBottom ref="item1">
				<u--input v-model="formData.oldPassWord" border="none"></u--input>
			</u-form-item>	
			<u-form-item label="新密码:" prop="formData.newPassWord" borderBottom ref="item1">
				<u--input v-model="formData.newPassWord" border="none"></u--input>
			</u-form-item>	
			<u-form-item label="确认密码:" prop="formData.confirmPassword" borderBottom ref="item1">
				<u--input v-model="formData.confirmPassword" border="none"></u--input>
			</u-form-item>
			
			<u-button class="submit-button" :custom-style="customStyle" type="primary" @click="openUpdateModule">修改</u-button>
			
			<!-- 点击修改厚的模态框 -->
			<view>
				<u-modal :show="modalShow" :title="modalTitle" :content='modalContent' :closeOnClickOverlay="true" @close="closeModal"
				:showCancelButton="true" @confirm="confirmSubmit" @cancel="cancelSubmit"></u-modal>
			</view>
		</u--form>
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
				formData:{
					oldPassWord:"",
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
			openUpdateModule(){
				
			},
			// 确认是否修改
			openUpdateModule(){
				this.modalShow = true;
			},
			
			// 点击确认按钮触发
			confirmSubmit(){
				this.modalShow = false;
			},
			
			// 点击取消按钮触发
			cancelSubmit(){
				this.modalShow = false;
			},
			
			// 点击遮罩层关闭modal
			closeModal(){
				this.modalShow = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 10px;
	}
</style>
