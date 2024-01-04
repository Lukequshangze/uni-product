<template>
	<!-- 班级信息 -->
	<view class="content">
		<u--form labelPosition="left" :model="formData" :rules="rules" ref="uForm" labelWidth="100">
			<u-form-item label="班级名称:" prop="formData.className" borderBottom ref="item1">
				<u--input v-model="formData.className" border="none" disabled></u--input>
			</u-form-item>	
			<u-form-item label="老师ID:" prop="formData.id" borderBottom ref="item1">
				<u--input v-model="formData.id" border="none" disabled></u--input>
			</u-form-item>	
			<u-form-item label="老师名称:" prop="formData.markName" borderBottom ref="item1">
				<u--input v-model="formData.markName" border="none" disabled></u--input>
			</u-form-item>	
			<u-form-item label="带入状态:" prop="formData.status" borderBottom ref="item1">
				<u-switch v-model="formData.status" @change="bringStatusChange"></u-switch>
			</u-form-item>	
			<u-form-item label="带入开关:" prop="formData.bring" borderBottom ref="item1">
				<u-switch v-model="formData.bring" @change="bringSwitchChange"></u-switch>
			</u-form-item>	
			<u-form-item label="班费押金:" prop="formData.deposit" borderBottom ref="item1">
				<u--input v-model="formData.deposit" border="none" disabled></u--input>
			</u-form-item>	
			<u-form-item label="班费信用金:" prop="formData.creditScore" borderBottom ref="item1">
				<u--input v-model="formData.creditScore" border="none" disabled></u--input>
			</u-form-item>
			
			<u-button class="submit-button" :custom-style="customStyle" type="primary" @click="openUpdateModule">修改</u-button>
			
			<!-- 点击修改后的模态框 -->
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
					id: '',
					markName: '',
					status: false,
					bring: false,
					deposit: '',
					creditScore: '',
				},
				rules: {
					// 'formData.id': {type: 'string',required: true,message: '请填写Id',trigger: ['blur', 'change']},
					// 'formData.markName': {type: 'string',required: true,message: '请填写姓名',trigger: ['blur', 'change']},
				},
				radio: '',
				switchVal: false,
				
				modalShow:false,
				modalTitle:'提示',
				modalContent:'确认是否修改？',
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
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					id: this.formData.id,
					status: this.formData.status == false ? 0 : 1,     // 带入状态 0自动， 1手动
					bring: this.formData.bring == false ? 0 : 1,     // 带入开关 0关闭， 1开启 
				}
							
				uni.$u.http.post('/app/api/class/edit', params).then(res => {
					if(res.code == 0){
						this.getClassInfo();
						this.modalShow = false; // 关闭model框
						setTimeout(()=>{
							this.$api.msg("修改成功");
						},200)
					}else{
						this.$api.msg(res.msg);
						this.modalShow = false;
					}
				}).catch((err) =>{
					//隐藏加载框
					uni.hideLoading();
				})
			},
			
			// 点击取消按钮触发
			cancelSubmit(){
				this.modalShow = false;
			},
			
			// 点击遮罩层关闭modal
			closeModal(){
				this.modalShow = false;
			},
			
			// 获取班级信息
			getClassInfo(){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.$u.http.post('/app/api/class/info', params).then(res => {
					if(res.code == 0){
						console.log("res",res)
						this.formData = res.data;
						this.formData.bring = this.formData.bring == 0 ? false : true;
						this.formData.status = this.formData.status == 0 ? false : true;
						//隐藏加载框
						uni.hideLoading();
					}
				}).catch((err) =>{
					this.$api.msg(err.msg);
					//隐藏加载框
					uni.hideLoading();
				})
			},
		},
		created() {
			this.getClassInfo();
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