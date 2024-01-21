<template>
	<!-- 分组管理 -->
	<view class="content">
		<NoticeBar ref="noticeRef"/>
		<menuBar />
		<u-swiper />
		<view>
			<view class="query-content">
				<view class="query-content-input" style="display: flex;">
					<view class="query-content-select">
						分组名: 
					</view>
					<view class="u-demo-block__content" style="width: 100%;">
						<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
						<!-- #ifndef APP-NVUE -->
						<u-input placeholder="请输入" v-model="searchForm.gn">
						<!-- #endif -->
							<!-- #ifdef APP-NVUE -->
							<u--input placeholder="请输入">
							<!-- #endif -->
								<template slot="suffix">
									<!-- @tap 手指触摸离开时触发 -->
									<u-button @tap="getGroupManageList" type="primary" size="mini">查询</u-button>
								</template>
						<!-- #ifndef APP-NVUE -->
						</u-input>
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						</u--input>
						<!-- #endif -->
					</view>
				</view>
				<view class="" style="position: relative;top: 1px;margin-left: 5px;">
					<u-button type="primary" size="mini" @click="openAddGroupAchieve" style="height: 30px; width: 76px;">新增分组</u-button>
				</view>
			</view>
			<!-- 无数据时 -->
			<view style="margin-top: 15px;" class="" v-if="!indexList || indexList.length===0">
				<u-empty
				        mode="data"
				        icon="../../static/icon/no-data-img.png"
				>
				</u-empty>
			</view>
			<view class="" v-if="!indexList || indexList.length > 0">
				<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 12px;">
					<view class="claim-content-bottom">
						<view class="left-range" style="width: 15%;">
							{{ item.gIdLabel }} {{ item.gId }}
						</view>
						<view class="left-range" style="width: 40%;">
							{{ item.gnLabel }} {{ item.gn }}
						</view>
						<view class="left-range" style="width: 30%;">
							{{ item.csLabel }} {{ item.cs }}
						</view>
						<view class="left-range" style="display: flex;margin-top: 3px;">
							<u-button type="primary" text="额备" @click="openModelGroupAchieve(item)" size="mini"></u-button>
							<u-button type="primary" text="移除" @click="openRemoveBtn(item)" size="mini" style="margin-left: 3px;"></u-button>
							<u-button type="primary" text="查看学生" @click="viewGroupStudent(item)" style="margin-left: 3px;" size="mini"></u-button>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 分组下学生信息 -->
			<view class="" @touchmove.stop.prevent="stopPenetrate">
				<u-popup customStyle="padding:40px 5px 0 5px" :show="showGroupStudentModal" mode="bottom" :round="12" @close="closeModelStudentGroup" closeable closeOnClickOverlay safeAreaInsetBottom>
					<view style="height: 60vh;">
						<view class="student-info">
							{{ groupInfo.gn }} 分组下学生信息
						</view>
						<view class="" style="margin-top: 40px;" v-if="!studentList || studentList.length == 0">
							<u-empty use-solt
								mode="data"
								icon="../../static/icon/no-data-img.png"
							>
							</u-empty>
						</view>
						<view class="" v-for="(item,i) in studentList" :key="i">
							<view class="student-group">
								<view class="" style="width: 45%;">
									学生ID：{{ item.studentId }}
								</view>
								<view class="" style="width: 45%;">
									学生姓名：{{ item.nickName }}
								</view>
								<u-button type="primary" text="解除绑定" @click="openSecure(item)" size="mini" style="width: 30px;"></u-button>
							</view>
						</view>
						<view class="" style="display: flex;justify-content: space-around;margin-top: 60rpx;">
							<u-button type="primary" text="确定" @click="closeModelStudentGroup" style="width: 30%;"></u-button>
							<u-button type="info" text="取消" @click="closeModelStudentGroup" style="width: 30%;"></u-button>
						</view>
					</view>
				</u-popup>
			</view>
			
			<!-- 额备 -->
			<view class="" @touchmove.stop.prevent="stopPenetrate">
				<u-popup customStyle="padding:40px 5px 0 5px" :show="showModalGroupAchieve" mode="bottom" :round="12" @close="closeModelGroupAchieve" closeable closeOnClickOverlay safeAreaInsetBottom>
					<view style="height: 40vh;">
						<u--form
								labelPosition="left"
								:model="model1"
								ref="uForm"
								labelWidth="200rpx"
						>
						<u-form-item
								label="分组ID"
								ref="item1"
								borderBottom
						>
							<u--input
									v-model="model1.userInfo.gId"
									border="none"
									disabled
							></u--input>
						</u-form-item>
						<u-form-item
								label="分组名称"
								ref="item1"
								borderBottom
						>
							<u--input
									v-model="model1.userInfo.name"
									border="none"
									disabled
							></u--input>
						</u-form-item>
							<u-form-item
									label="分组信额"
									ref="item1"
									borderBottom
							>
								<u--input
										v-model="model1.userInfo.cs"
										border="none"
								></u--input>
							</u-form-item>
						</u--form>
						<view class="" style="display: flex;justify-content: space-around;margin-top: 60rpx;">
							<u-button type="primary" text="确定" @click="submitForm" style="width: 30%;"></u-button>
							<u-button type="info" text="取消" @click="closeModelGroupAchieve" style="width: 30%;"></u-button>
						</view>
					</view>
				</u-popup>
			</view>
			
			<!-- 新增分组 -->
			<view class="" @touchmove.stop.prevent="stopPenetrate">
				<u-popup customStyle="padding:40px 5px 0 5px" :show="showAddGroupAchieve" mode="bottom" :round="12" @close="closeAddGroupAchieve" closeable closeOnClickOverlay safeAreaInsetBottom>
					<view style="height: 40vh;">
						<u--form
								labelPosition="left"
								:model="model1"
								ref="uForm"
								labelWidth="200rpx"
						>
						<u-form-item
								label="分组名称"
								ref="item1"
								borderBottom
						>
							<u--input
									v-model="addGroupData.gn"
									border="none"
									placeholder="请输入分组名称"
							></u--input>
						</u-form-item>
							<u-form-item
									label="分组信额"
									ref="item1"
									borderBottom
							>
								<u--input
										v-model="addGroupData.cs"
										border="none"
										placeholder="请输入信额"
								></u--input>
							</u-form-item>
						</u--form>
						<view class="" style="display: flex;justify-content: space-around;margin-top: 60rpx;">
							<u-button type="primary" text="新增" @click="submitAddGroup" style="width: 30%;"></u-button>
							<u-button type="info" text="取消" @click="closeAddGroupAchieve" style="width: 30%;"></u-button>
						</view>
					</view>
				</u-popup>
			</view>
			<!-- 移除模态框 -->
			<u-modal :show="removeModel" :content='removeContent' @confirm="removeConfirm" @cancel="removeCancel" showCancelButton></u-modal>
			<!-- 解除绑定模态框 -->
			<u-modal :show="secureModel" :content='secureContent' @confirm="secureConfirm" @cancel="secureCancel" showCancelButton></u-modal>
		</view>
		<!-- 底部导航栏组件 -->
		<customTabBar></customTabBar>
	</view>
</template>

<script>
	import customTabBar from "@/components/tabbar/tabbar.vue";
	import menuBar from "@/components/tabbar/menuBar.vue";
	import uSwiper from "@/components/tabbar/swiper.vue";
	import NoticeBar from "@/components/notify/notifyBar.vue";
	export default {
		data() {
			return {
				pickerShow: false,
				showModalGroupAchieve: false,
				showGroupStudentModal: false,
				showAddGroupAchieve: false,
				valueTime: Number(new Date()),
				startTime: "",
				endTime: "",
				inputType: "start",
				searchForm:{
					gn: "",
				},
				datalist: [],
				indexList: [],
				removeContent:"确认移除此分组？",
				removeModel: false,
				removeObjData: {},
				
				secureModel: false,
				secureContent: "确认解除绑定？",
				model1: {
					userInfo: {
						name: '',
						gId: '',
						cs: '',
					},
				},
				addGroupData:{
					cs:"",
					gn:"",
				},
				timer: null,
				studentList: [],
				groupInfo: {},
				page: 1,
				limit: 20,
				totalStudent: 0,
			}
		},
		components: {
			customTabBar,
			NoticeBar,
			menuBar,
			uSwiper,
		},
		onLoad() {

		},
		onShow() {
			this.$store.commit("changeTabbarIndex", 0);
		},
		methods: {
			getGroupManageList(type){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					gn: this.searchForm.gn,
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.$u.http.post('/app/api/sys/grouplist', params).then(res => {
					if(res.code == 0){
						this.total = res.data.count;
						this.indexList = res.data.itemVoList;
						uni.hideLoading();
					}else{
						this.$api.msg(err.msg);
					}
				}).catch((err) =>{
					//隐藏加载框
					uni.hideLoading();
				})
			},
			
			// 打开额备弹出层
			openModelGroupAchieve(item){
				this.showModalGroupAchieve = true;
				this.model1.userInfo.gId = item.gId;
				this.model1.userInfo.name = item.gn;
				this.model1.userInfo.cs = item.cs;
			},
			
			// 查看分组下的学生信息
			viewGroupStudent(item){
				this.groupInfo = item;
				this.showGroupStudentModal = true;
				// 获取学生信息
				this.getStudentByGroup(item);
			},
			
			// 获取学生信息
			getStudentByGroup(item){
				console.log("item",item);
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					gId: item.gId,
					page: this.page,
					limit: this.limit,
					start: 0,
				}
				uni.$u.http.post('/app/api/sys/group/player', params).then(res => {
					if(res.code == 0){
						this.totalStudent = res.data.count;
						this.studentList = res.data.itemVoList;
					}else{
						this.$api.msg(res.msg);
					}
				}).catch((err) =>{
					console.log("err",err)
				})
			},
			
			async onReachBottom() {
				if(this.totalStudent > this.page * this.limit){
					this.page += 1;
					this.getStudentByGroup("more");
				}else{
					this.$api.msg("已加载全部数据");
				}
			},
			
			// 关闭学生信息弹出层
			closeModelStudentGroup(){
				this.showGroupStudentModal = false;
			},
			
			// 解除绑定
			openSecure(item){
				this.secureModel = true;
				this.studentInfo = item;
			},
			// 解除绑定取消事件
			secureCancel(){
				this.secureModel = false;
			},
			// 确认解除绑定
			secureConfirm(){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					studentId: this.studentInfo.studentId,
					gId: this.groupInfo.gId,
					gName: this.groupInfo.gn,
				}
				uni.$u.http.post('/app/api/sys/player/group/unbind', params).then(res => {
					if(res.code == 0){
						this.getStudentByGroup(this.groupInfo);   // 刷新列表
						this.secureModel = false;  // 关闭model框
						setTimeout(()=>{
							this.$api.msg("解绑成功");
						},200)
					}else{
						this.$api.msg(res.msg);
					}
				}).catch((err) =>{
					console.log("err",err)
				})
			},
			
			// 关闭额备弹出层
			closeModelGroupAchieve(item){
				this.showModalGroupAchieve = false;
			},
			
			// 提交表单
			submitForm(){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					gId: this.model1.userInfo.gId,
					cs: Number(this.model1.userInfo.cs),
					gn: this.model1.userInfo.name,
				}
				if(!this.model1.userInfo.cs && this.model1.userInfo.cs !==0){
					this.$api.msg("请输入额备值...");
				}else{
					uni.$u.http.post('/app/api/sys/group/edit', params).then(res => {
						if(res.code == 0){
							this.showModalGroupAchieve = false;
							this.getGroupManageList();
							setTimeout(()=>{
								this.$api.msg("修改成功");
							},200)
						}else{
							this.$api.msg(res.msg);
							this.showModalGroupAchieve = false;
						}
					}).catch((err) =>{
						//隐藏加载框
						uni.hideLoading();
					})
				}
			},
			
			// 移除
			openRemoveBtn(item){
				this.removeModel = true;
				// 存放将要删除的数据
				this.removeObjData = item;
			},
			// 确认移除
			removeConfirm(){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					gId: this.removeObjData.gId,
					cs: this.removeObjData.cs,
					gn: this.removeObjData.gn,
				}
				uni.$u.http.post('/app/api/sys/group/delete', params).then(res => {
					if(res.code == 0){
						this.getGroupManageList();   // 刷新列表
						this.removeModel = false;  // 关闭model框
						setTimeout(()=>{
							this.$api.msg("移除成功");
						},200)
					}else{
						this.$api.msg(res.msg);
					}
				}).catch((err) =>{
					console.log("err",err)
				})
			},
			// 移除-取消事件
			removeCancel(){
				this.removeModel = false;
			},
			
			// 防止弹出层滑动
			stopPenetrate(){
				return;
			},
			
			// 新增分组
			// 打开分组弹出层
			openAddGroupAchieve(item){
				this.showAddGroupAchieve = true;
			},
			// 关闭新增分组弹出层
			closeAddGroupAchieve(item){
				this.showAddGroupAchieve = false;
			},
			// 提交
			submitAddGroup(){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					cs: Number(this.addGroupData.cs),
					gn: this.addGroupData.gn,
				}
				if(!this.addGroupData.gn){
					this.$api.msg("请输入分组名称...");
				}else if(!this.addGroupData.cs && this.addGroupData.cs !==0){
					this.$api.msg("请输入额备值...");
				}else{
					uni.$u.http.post('/app/api/sys/group/edit', params).then(res => {
						if(res.code == 0){
							this.showAddGroupAchieve = false;
							this.getGroupManageList();
							setTimeout(()=>{
								this.$api.msg("分组新增成功");
							},200)
						}else{
							this.$api.msg(res.msg);
							this.showAddGroupAchieve = false;
						}
					}).catch((err) =>{
						//隐藏加载框
						uni.hideLoading();
					})
				}
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
			this.getGroupManageList();
		},
		onHide() {
			if(this.timer){
				clearInterval(this.timer);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		display: flex;
		margin-top: 10px;

		.time-line {
			position: relative;
			top: 8px;
			margin: 0 10px;
		}
	}

	.text {
		font-size: 12px;
		color: #666;
		margin-top: 5px;
	}

	.uni-px-5 {
		padding-left: 10px;
		padding-right: 10px;
	}

	.uni-pb-5 {
		padding-bottom: 10px;
	}

	.query-content {
		display: flex;
		margin-top: 10px;

		.query-content-select {
			width: 70px;
			position: relative;
			top: 5px;
		}

		.query-content-input {
			margin-left: 2%; 
			width: 100%;
		}
	}
	::v-deep {

		.u-input--radius,
		.u-input--square {
			padding: 4px 9px !important;
		}
	}
	.claim-content{
		background: #f2f2f2;
		margin-top: 5px;
		padding: 5px 8px;
		line-height: 26px;
		.claim-content-top{
			display: flex;
			justify-content: space-between;
			.claim-content-top-left{
				// width: 60%;
			}
			.claim-content-top-right{
				// width: 40%;
				padding-right: 10px;
			}
		}
		.claim-content-bottom{
			display: flex;
			justify-content: space-between;
			padding-right: 0px;
		}
		.left-range{
			
		}
	}
	.student-info{
		display: flex;
		justify-content: center;
		font-size: 18px;
		font-weight: bold;
		margin: 5px 0 15px 0;
	}
	.student-group{
		display: flex;
		justify-content: space-between;
		background: #f2f2f2;
		margin-top: 5px;
		padding: 5px 8px;
		line-height: 26px;
		font-size: 12px;
	}
</style>