<template>
	<!-- 老师管理 -->
	<view class="content">
		<NoticeBar />
		<menuBar />
		<u-swiper />
		<view>
			<view class="">
			<!-- 	<u-datetime-picker :show="pickerShow" v-model="valueTime" mode="date" @confirm="getDate"
					@close="pickerClose" @change="changeStartTime"></u-datetime-picker>
				<view class="search-box">
					<u--input shape="circle" placeholder="起始时间" border="surround" v-model="startTime"
						@focus="selectStartTime"></u--input>
					<span class="time-line"> - </span>
					<u--input shape="circle" placeholder="结束时间" border="surround" v-model="endTime"
						@focus="selectEndTime"></u--input>
				</view> -->
				<view class="query-content">
					<view class="query-content-select">
						<uni-data-select v-model="chosetype" :localdata="studentSelect"></uni-data-select>
					</view>
					<view class="query-content-input">
						<view class="u-demo-block__content">
							<!-- 注意:由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
							<!-- #ifndef APP-NVUE -->
							<u-input placeholder="请输入" v-model="searchForm.valueData">
							<!-- #endif -->
								<!-- #ifdef APP-NVUE -->
								<u--input placeholder="请输入">
								<!-- #endif -->
									<template slot="suffix">
										<!-- @tap 手指触摸离开时触发 -->
										<u-button @tap="getTeacherManageList" type="primary"
											size="mini">查询</u-button>
									</template>
							<!-- #ifndef APP-NVUE -->
							</u-input>
							<!-- #endif -->
							<!-- #ifdef APP-NVUE -->
							</u--input>
							<!-- #endif -->
						</view>
					</view>
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
			<view class="" v-if="!indexList || indexList.length>0">
				<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 12px;">
					<view class="">
						<uni-row class="demo-uni-row">
							<uni-col :span="6">
								<view class="demo-uni-col dark">
									{{ item.pNameLabel }}:{{ item.pName }}
								</view>
							</uni-col>
							<uni-col :span="8">
								<view class="demo-uni-col light">
									{{ item.qwlLabel }}:{{ item.qwl }}
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col dark">
									{{ item.yozsrLabel }}:{{ item.yozsr }}
								</view>
							</uni-col>
							<uni-col :span="4">
								<view class="demo-uni-col light" style="display: flex;">
									<span>状态:</span>
									<u-switch size="14" style="position: relative;top: 5px;left: 3px;" v-model="item.status" @change="bringStatusChange"></u-switch>
								</view>
							</uni-col>
						</uni-row>
						
						<uni-row class="demo-uni-row">
							<uni-col :span="6">
								<view class="demo-uni-col dark" style="font-size: 10px;color: #d9001b;">
									{{ item.nameLabel }}:{{ item.name }}
								</view>
							</uni-col>
							<uni-col :span="8">
								<view class="demo-uni-col light">
									{{ item.csLabel }}:{{ item.cs }}
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col dark">
									{{ item.erLabel }}:{{ item.er }}
								</view>
							</uni-col>
							<uni-col :span="4">
								<view class="demo-uni-col light" style="display: flex;">
									<span>带入:</span>
									<u-switch size="14" style="position: relative;top: 5px;left: 3px;" v-model="item.bring" @change="bringStatusChange"></u-switch>
								</view>
							</uni-col>
						</uni-row>
						<uni-row class="demo-uni-row">
							<uni-col :span="6">
								<view class="demo-uni-col dark">
									{{ item.ratioLabel }}:{{ item.ratio }}
								</view>
							</uni-col>
							<uni-col :span="8">
								<view class="demo-uni-col light">
									{{ item.recLabel }}:{{ item.rec }}
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col dark">
									{{ item.boundLabel }}:{{ item.bound === 0 ? '否' : '是'}}
								</view>
							</uni-col>
							<uni-col :span="4">
								<view class="demo-uni-col light" style="width: 40px;">
									<u-button type="primary" @click="openModelTeacher(item)" text="编辑" size="mini"></u-button>
								</view>
							</uni-col>
						</uni-row>
					</view>
					<view class=""></view>
					<view class=""></view>
				</view>
			</view>
			<!-- 编辑弹出层 -->
			<u-popup customStyle="padding:40px 5px 0 5px" :show="showModalTeacherEdit" mode="bottom" :round="12" @close="closeModelTeacher" closeable closeOnClickOverlay safeAreaInsetBottom>
				<view style="height: 50vh;" class="teacher-edit">
					<u--form
							labelPosition="left"
							:model="teacherObj"
							ref="uForm"
							labelWidth="140rpx"
					>
						<view class="teacher-edit-title">
							老师编辑
						</view>
						<view class="teacher-edit-content">
							<u-form-item
									label="上级老师:"
									ref="item1"
									style="width: 49%;"
							>
								<view class="">
									{{ teacherObj.pName }}
								</view>
							</u-form-item>
							<u-form-item
									label="是否禁用:"
									ref="item1"
									style="width: 49%;margin-left: 2%;"
							>
								<u-switch size="14" style="position: relative;top: 4px;left: 3px;" v-model="teacherObj.bound" @change="editUseChange"></u-switch>
							</u-form-item>
						</view>
						<view class="teacher-edit-content">
							<u-form-item
									label="老师名称:"
									ref="item1"
									style="width: 49%;"
							>
								<view class="">
									{{ teacherObj.name }}
								</view>
							</u-form-item>
							<u-form-item
									label="剩余额度:"
									ref="item1"
									style="width: 49%;margin-left: 2%;position: relative;top: 3px;"
							>
								<text>{{ teacherObj.rec }}</text>
							</u-form-item>
						</view>
						<view class="teacher-edit-content">
							<u-form-item
									label="返比比例:"
									ref="item1"
									style="width: 49%;"
							>
								<u--input v-model="teacherObj.ratio" style="height: 18px;"></u--input>
							</u-form-item>
							<u-form-item
									label="信用额度:"
									ref="item1"
									style="width: 49%;margin-left: 2%"
							>
								<u--input v-model="teacherObj.cs" style="height: 18px;"></u--input>
							</u-form-item>
						</view>
						<view class="teacher-edit-content">
							<u-form-item
									label="基金奖罚:"
									ref="item1"
									style="width: 49%;"
							>
								<u--input v-model="teacherObj.er" style="height: 18px;"></u--input>
							</u-form-item>
							<u-form-item
									label="初始押金:"
									ref="item1"
									style="width: 49%;margin-left: 2%"
							>
								<u--input v-model="teacherObj.deposit" style="height: 18px;"></u--input>
							</u-form-item>
						</view>
						<view class="teacher-edit-content">
							<u-form-item
									label="战绩奖罚:"
									ref="item1"
									style="width: 49%;"
							>
								<u--input v-model="teacherObj.yozsr" style="height: 18px;"></u--input>
							</u-form-item>
							<u-form-item
									label="输赢额度:"
									ref="item1"
									style="width: 49%;margin-left: 2%"
							>
								<u--input v-model="teacherObj.qwl" style="height: 18px;"></u--input>
							</u-form-item>
						</view>
					</u--form>
					<view class="" style="display: flex;justify-content: space-around;margin-top: 60rpx;">
						<u-button type="primary" text="确定" @click="submitTeacherForm" style="width: 30%;"></u-button>
						<u-button type="info" text="取消" @click="closeModelTeacher" style="width: 30%;"></u-button>
					</view>
				</view>
			</u-popup>
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
				valueTime: Number(new Date()),
				startTime: "",
				endTime: "",
				inputType: "start",

				datalist: [],
				searchForm: {
					nk: "",
					aid: "",
					page: 1,
					limit: 20,
					valueData: "",
				},
				// bringStatus: false,// 状态
				// bringSwitch: false,// 状态
				indexList: [],
				chosetype: "",
				studentSelect: [{
						value: 0,
						text: "老师ID"
					},
					{
						value: 1,
						text: "老师名称"
					}
				],
				teacherObj: {
					name: 1
				},
				showModalTeacherEdit: false,
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
			this.datalist = [{
					text: "名称",
					value: "0"
				},
				{
					text: "ID",
					value: "1"
				}
			];
		},
		methods: {
			// 获取老师管理信息
			getTeacherManageList(type){
				if(this.chosetype === 0){
					this.searchForm.aid = Number(this.searchForm.valueData);
					this.searchForm.nk = "";
				}else if(this.chosetype === 1){
					this.searchForm.nk = this.searchForm.valueData;
					this.searchForm.aid = "";
				}
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					an: this.searchForm.nk,
					aid: this.searchForm.aid,
					page: this.searchForm.page,
					limit: this.searchForm.limit,   // 默认 20
					start: "",
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.$u.http.post('/app/api/sys/teachlist', params).then(res => {
					if(res.code == 0){
						this.total = res.data.count;
						if(type && type==="more"){
							res.data.itemVoList.forEach(item=>{
								this.indexList.push(item)
							})
						}else{
							this.indexList = res.data.itemVoList;
						}
						this.indexList.forEach(item=>{
							if(item.status === 0){
								item.status = false;
							}else{
								item.status = true;
							}
							
							if(item.bring === 0){
								item.bring = false;
							}else{
								item.bring = true;
							}
						})
						uni.hideLoading();
					}else{
						this.$api.msg("加载失败");
					}
				}).catch((err) =>{
					//隐藏加载框
					uni.hideLoading();
				})
			},
			async onReachBottom() {
				if(this.total > this.searchForm.page * this.searchForm.limit){
					this.searchForm.page += 1;
					this.getTeacherManageList("more");
				}else{
					this.$api.msg("已加载全部数据");
				}
			},
			
			// 编辑
			// 打开编辑弹出层
			openModelTeacher(item){
				this.showModalTeacherEdit = true;
				this.teacherObj = item;
				if(this.teacherObj.bound == 1){
					this.teacherObj.bound = true;
				}else{
					this.teacherObj.bound = false;
				}
				console.log("it",item)
			},
			// 关闭编辑弹出层
			closeModelTeacher(item){
				this.showModalTeacherEdit = false;
			},
			
			// 提交表单
			submitTeacherForm(){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					id: this.teacherObj.id,		   // 主键id
					name: this.teacherObj.name,     // 昵称
					bound: this.teacherObj.bound == 0 || this.teacherObj.bound == false ? 0 : 1,   // 是否禁用 1:是；0:否
					ratio: Number(this.teacherObj.ratio),   // 返比
					status: this.teacherObj.status == false || this.teacherObj.status == 0 ? 0 : 1,   // 带入状态 0:自动；1:手动
					er: Number(this.teacherObj.er),   // 基奖罚
					yozsr: Number(this.teacherObj.yozsr),   // 战奖罚
					pId: this.teacherObj.pid,   // 上级老师id
					pName: this.teacherObj.pName,   // 上级老师名称
					bring: this.teacherObj.bring === true ? 1 : 0,   // 带入开关 1:开启，0:关闭
					cs: this.teacherObj.cs,   // 信额
					deposit: Number(this.teacherObj.deposit),   // 押金
					qwl: this.teacherObj.qwl,   // 输额
					rec: this.teacherObj.rec,   // 当前剩额
				}
			
				uni.$u.http.post('/app/api/sys/teach/edit', params).then(res => {
					if(res.code == 0){
						this.getTeacherManageList("update");   // 刷新列表
						this.showModalTeacherEdit = false;  // 关闭model框
						setTimeout(()=>{
							this.$api.msg("修改成功");
						},200)
					}else{
						this.$api.msg(res.msg);
						this.showModalTeacherEdit = false;
					}
				}).catch((err) =>{
					//隐藏加载框
					uni.hideLoading();
				})
			},
			
			// 禁用修改
			editUseChange(){
				
			},
		},
		created() {
			this.getTeacherManageList();
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
			width: 29%;
		}

		.query-content-input {
			margin-left: 1%;
			width: 69%;
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
			padding-right: 10px;
		}
		.left-range{
			margin-left:5px;
		}
		::v-deep{
			.u-button--mini{
				min-width: 0 !important;
			}
		}
	}
	.teacher-edit{
		.teacher-edit-title{
			display: flex;
			justify-content: center;
			text-align: center;
			color: #000;
			font-size: 20px;
			font-weight: bold;
			margin: 10px 0 15px 0;
		}
		.teacher-edit-content{
			display: flex;
		}
	}
</style>