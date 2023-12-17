<template>
	<!-- 老师成绩 -->
	<view class="content">
		<NoticeBar />
		<menuBar />
		<u-swiper />
		<view>
			<view class="" style="margin-top: 10px;">
				<u-datetime-picker :show="pickerShow" v-model="valueTime" mode="date" @confirm="getDate"
					@cancel="pickerClose" closeOnClickOverlay>
				</u-datetime-picker>
				<view class="" style="display: flex;">
					<p style="position: relative;top: 8px;">查询时间：</p>
					<u--input shape="circle" placeholder="选择时间" border="surround" v-model="searchForm.dailyDate"
						@focus="selectStartTime"></u--input>
				</view>
				<view class="search-cond">
					<span class="search-nk">昵 称: </span>
					  <view class="u-demo-block__content" style="width: calc(100% - 50px);">
						<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
						<!-- #ifndef APP-NVUE -->
						<u-input placeholder="请输入昵称" v-model="searchForm.nk">
						<!-- #endif -->
							<!-- #ifdef APP-NVUE -->
							<u--input placeholder="请输入昵称">
							<!-- #endif -->
								<template slot="suffix">
									<!-- @tap 手指触摸离开时触发 -->
									<u-button @tap="getTeacherAchieve" type="primary" size="mini">查询</u-button>
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
			<view class="teacher-table teacher-table-main">
				<!-- 表格 -->
				<zb-table
					:show-header="true"
					:columns="column"
					:stripe="true"
					:fit="false"
					@rowClick="rowClick"
					@toggleRowSelection="toggleRowSelection"
					@toggleAllSelection="toggleAllSelection"
					:border="true"
					@edit="buttonEdit"
					@dele="dele"
					:data="dataVal">
				</zb-table>
			</view>
			<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 14px;">
				<view class="claim-content-top">
					<view class="claim-content-top-left">
						<span style="color: #d9001B">{{ item.an }}</span>
					</view>
					<view class="claim-content-top-left">
						<span>{{ item.tbsLabel }}{{ item.tbs }}</span>
					</view>
					<view class="claim-content-top-left">
						<span>{{ item.sbLabel }}{{ item.sb }}</span>
					</view>
					<view class="claim-content-top-right">
						<!-- <span>2023.12.17</span> -->
					</view>
				</view>
				<view class="claim-content-top">
					<view class="claim-content-top-left">
						{{ item.totalLabel }}{{ item.total }}
					</view>
					<view class="claim-content-top-left">
						{{ item.yozishLabel }}{{ item.yozish }}
					</view>
					<view class="claim-content-top-left">
						{{ item.rewardLabel }}{{ item.reward }}
					</view>
					<view class="claim-content-top-left">
						<u-button type="primary" @click="teacherAchieveDetail(item)" text="详情" size="mini"></u-button>
					</view>
				</view>
			</view>
			
			<u-popup customStyle="padding:40px 5px 0 5px" :show="showModalTeacherAchieve" mode="bottom" :round="12" @close="closePopupTeacherAchieve" closeable closeOnClickOverlay safeAreaInsetBottom>
				<view style="height: calc(100vh - 200px);">
					<view class="u-pop-box">
						<view class="pop-box-name">
							名称: {{ teacherAchieveInfo.an }}
						</view>
						<!-- 总成绩 总hejin -->
						<view class="achieve-box">
							<view class="">
								{{ teacherAchieveInfo.totalLabel }} {{ teacherAchieveInfo.total }}
							</view>
						</view>
						<!-- 列表 -->
						<view class="info-table-detail">
							<!-- 上表 -->
							<table class="table">
								<thead> <!-- thead标签在这里已经不代表表头了-->
									<tr>  <!-- 每个tr标签的第一个td标签为表头-->
										<td class="table_content">
											<p>{{ teacherAchieveInfo.tbsLabel }}</p>
										</td>
										<td class="table_content">
											<p>{{ teacherAchieveInfo.sbLabel }}</p>
										</td>
										<td class="table_content">
											<p>{{ teacherAchieveInfo.yozishLabel }}</p>
										</td>
										<td class="table_content">
											<p>{{ teacherAchieveInfo.rewardLabel }}</p>
										</td>
									</tr>
								</thead>
								<tbody>
									<tr class="table_tr">
										<td class="table_content">
										    <p>{{ teacherAchieveInfo.tbs }}</p>
										</td>
										<td class="table_content">
										    <p>{{ teacherAchieveInfo.sb }}</p>
										</td>
										<td class="table_content">
										    <p>{{ teacherAchieveInfo.yozish }}</p>
										</td>
										<td class="table_content">
										    <p>{{ teacherAchieveInfo.reward }}</p>
										</td>
									</tr>
								</tbody>
							</table>
							<!-- 下表 -->
							<view class="table_wrap">
								<view class="teacher-table">
									<!-- 表格 -->
									<zb-table
										:show-header="true"
										:columns="dataTableTitle"
										:stripe="true"
										:fit="false"
										@rowClick="rowClick"
										@toggleRowSelection="toggleRowSelection"
										@toggleAllSelection="toggleAllSelection"
										:border="true"
										@edit="buttonEdit"
										@dele="dele"
										:data="dataTableValue">
									</zb-table>
								</view>
							</view>
						</view>
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
				searchForm:{
					nk:"",  // 昵称
					dailyDate: "",
				},
				indexList: [],
				teacherAchieveInfo: {},
				showModalTeacherAchieve: false,
				dataTableTitle: [],
				dataTableValue: [],
				chosetype: 0,
				studentSelect: [{
						value: 0,
						text: "ID"
					},
					{
						value: 1,
						text: "名称"
					},
					{
						value: 2,
						text: "备注"
					},
					{
						value: 4,
						text: "所属"
					},
				],
				
				column:[],
				dataVal:[]  
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
				},
				{
					text: "备注",
					value: "2"
				},
				{
					text: "所属",
					value: "3"
				}
			];
		},
		methods: {
			// 获取老师成绩
			getTeacherAchieve(type){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					an: this.searchForm.nk,
					dailyDate: this.searchForm.dailyDate,
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.$u.http.post('/app/api/score/teacitems', params).then(res => {
					if(res.code == 0){
						// 上表
						this.dataVal = res.data[0] && res.data[0].billDetailVoList;
						let column = [];
						let obj = {};
						// 取出需要的key合并为数组  作为表头 ------------ start ------------
						this.selfAchieveList = res.data[0].billDetailVoList;
						for(let i=0;i<this.selfAchieveList.length;i++){
							obj.levelLabel = this.selfAchieveList[i].levelLabel;
							obj.perLabel = this.selfAchieveList[i].perLabel;
							obj.tbsLabel = this.selfAchieveList[i].tbsLabel;
							obj.tpbLabel = this.selfAchieveList[i].tpbLabel;
						}
						let keyList = Object.keys(obj);
						let valueList = Object.values(obj);
						let size=keyList.length;
						for(let i=0;i<size;i++){
						  let a={};
						  a.name=keyList[i];
						  a.label=valueList[i];
						  column.push(a);
						}
						console.log("column",column)
						// ------------ end ------------
						// 将表内容字段修改为和表头一样，对应数据
						column.forEach(item=>{
							if(item.name === "levelLabel"){
								item.name = "level";
							}
							if(item.name === "perLabel"){
								item.name = "per";
							}
							if(item.name === "tbsLabel"){
								item.name = "tbs";
							}
							if(item.name === "tpbLabel"){
								item.name = "tpb";
							}
						})
						this.column = column;
		
						// 下表
						this.indexList = res.data[0] && res.data[0].detailItemVoList;
						//隐藏加载框
						uni.hideLoading();
					}else{
						this.$api.msg("加载失败");
					}
				}).catch((err) =>{
					//隐藏加载框
					uni.hideLoading();
				})
			},
			// 关闭时间选择弹窗
			pickerClose() {
				this.pickerShow = false;
			},
			
			// 触发
			selectStartTime(){
				this.pickerShow = true; 
			},
			
			// picher确认事件
			getDate(e){
				this.pickerShow = false; 
				let date = new Date(e.value);
				this.searchForm.dailyDate = this.dateFormatter(
					"yyyy-MM-dd",
					date
				);
			}, 
			
			// 详情
			teacherAchieveDetail(item){
				this.teacherAchieveInfo = item;
				if(this.teacherAchieveInfo.levelItemVoList && this.teacherAchieveInfo.levelItemVoList.length > 0){
					let column = [];
					let obj = {};
					// 取出需要的key合并为数组  作为表头 ------------ start ------------
					for(let i=0;i<this.teacherAchieveInfo.levelItemVoList.length;i++){
						obj.levelLabel = this.teacherAchieveInfo.levelItemVoList[i].levelLabel;
						obj.scoreLabel = this.teacherAchieveInfo.levelItemVoList[i].scoreLabel;
						obj.tppbnLabel = this.teacherAchieveInfo.levelItemVoList[i].tppbnLabel;
					}
					let keyList = Object.keys(obj);
					let valueList = Object.values(obj);
					let size=keyList.length;
					for(let i=0;i<size;i++){
					  let a={};
					  a.name=keyList[i];
					  a.label=valueList[i];
					  column.push(a);
					}
					// ------------ end ------------
					column.forEach(item=>{
						if(item.name === "levelLabel"){
							item.name = "level";
						}
						if(item.name === "scoreLabel"){
							item.name = "score";
						}
						if(item.name === "tppbnLabel"){
							item.name = "tppbn";
						}
					})
					this.dataTableTitle = column;
					this.dataTableValue = this.teacherAchieveInfo.levelItemVoList;
				}
				this.showModalTeacherAchieve = true;
			},
			// 关闭弹出层
			closePopupTeacherAchieve(){
				this.showModalTeacherAchieve = false;
			},
		},
		created(){
			this.getTeacherAchieve();
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
			.claim-content-top-left{
				width: 25%;
			}
			.claim-content-top-right{
				padding-right: 10px;
			}
		}
		.left-range{
			margin-left:5px;
		}
	}
	.teacher-table{
		margin: 10px 0;
	}
	.search-cond{
		display: flex;
		margin-top: 10px;
		.search-nk{
			position: relative;
			top: 8px;
			margin-right: 15px;
			width: 50px;
		}
	}
	.u-pop-box{
		.pop-box-name{
			font-size: 22px;
			font-weight: bold;
			color: #000;
			text-align: center;
		}
		.achieve-box{
			display: flex;
			justify-content: center;
			margin-top: 10px;
			.achieve-box-last{
				margin-left: 30px;
			}
		}
		.achieve-label{
			display: flex;
			justify-content: center;
			margin-top: 5px;
			line-height: 25px;
		}
		.info-table-detail{
			margin-top: 10px;
			.table-time{
				font-weight: bold;
				font-size: 18px;
				display: flex;
				justify-content: center;
			}
		}
	}
	.table {
		border-collapse: collapse;
		width: 100%;
		text-align: center;
	}
	
	.table_content {
		padding: 10px;
	}
	.table_content{
		border: 1px solid rgb(232, 232, 232);
	}
	
	.table_tr{
		border: 1px solid rgb(232, 232, 232);
	}
	::v-deep .item-th{
		width: 33% !important;
	}
	::v-deep .item-td{
		width: 33% !important;
	}
	
	::v-deep .teacher-table-main .item-th{
		width: 25% !important;
	}
	::v-deep .teacher-table-main .item-td{
		width: 25% !important;
	}
</style>