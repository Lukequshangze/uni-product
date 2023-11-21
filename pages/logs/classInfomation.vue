<template>
	<!-- 班级信息 -->
	<view class="content">
		<u--form labelPosition="left" :model="formData" :rules="rules" ref="uForm" labelWidth="90">
			<u-form-item label="老师ID:" prop="formData.teacherId" borderBottom ref="item1">
				<u--input v-model="formData.teacherId" border="none"></u--input>
			</u-form-item>	
			<u-form-item label="老师名称:" prop="formData.teacherName" borderBottom ref="item1">
				<u--input v-model="formData.teacherName" border="none"></u--input>
			</u-form-item>	
			<u-form-item label="带入状态:" prop="formData.bringStatus" borderBottom ref="item1">
				<u-switch v-model="formData.bringStatus" @change="bringStatusChange"></u-switch>
			</u-form-item>	
			<u-form-item label="带入开关:" prop="formData.bringSwitch" borderBottom ref="item1">
				<u-switch v-model="formData.bringSwitch" @change="bringSwitchChange"></u-switch>
			</u-form-item>	
			<u-form-item label="班费押金:" prop="formData.classDeposit" borderBottom ref="item1">
				<u--input v-model="formData.classDeposit" border="none"></u--input>
			</u-form-item>	
			<u-form-item label="班费信用金:" prop="formData.classCredit" borderBottom ref="item1">
				<u--input v-model="formData.classCredit" border="none"></u--input>
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
	export default {
		data() {
			return {
				showSex: false,
				formData: {
					teacherId: '',
					teacherName: '',
					bringStatus: false,
					bringSwitch: false,
					classDeposit: '',
					classCredit: '',
				},
				rules: {
					// 'formData.teacherId': {type: 'string',required: true,message: '请填写Id',trigger: ['blur', 'change']},
					// 'formData.teacherName': {type: 'string',required: true,message: '请填写姓名',trigger: ['blur', 'change']},
				},
				radio: '',
				switchVal: false,
				
				modalShow:false,
				modalTitle:'提示',
				modalContent:'确认是否修改？'
			};
		},
		components: {
			customTabBar,
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			// 带入状态开关 -- 事件
			bringStatusChange(e){
				console.log("65e",e);
			},
			
			// 带入开关 -- 事件
			bringSwitchChange(e){
				console.log("70e",e);
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
	.submit-button{
		margin-top: 30px;
	}
}
</style>