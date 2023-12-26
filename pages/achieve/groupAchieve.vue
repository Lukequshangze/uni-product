<template>
	<!-- 分组成绩 -->
	<view class="content">
		<NoticeBar />
		<menuBar />
		<u-swiper />
		<view>
			<view class="search-box">
				<u-datetime-picker :show="pickerShow" v-model="valueTime" mode="date" @confirm="getDate"
					@cancel="pickerClose" closeOnClickOverlay>
				</u-datetime-picker>
				<view class="time-component" style="display: flex;">
					<p style="position: relative;top: 8px;width: 100px">查询时间：</p>
					<view class="time-component-input-all" @click="selectStartTime">
						{{ searchForm.dailyDate ? searchForm.dailyDate : "请选择时间" }}
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
				<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 14px;">
					<view class="claim-content-top">
						<view class="claim-content-top-left">
							<span style="color: #d9001B">{{ item.groupName }}</span>
						</view>
						<view class="claim-content-top-right">
							<span>{{ item.time }}</span>
						</view>
					</view>
					<view class="claim-content-bottom">
						<view class="left-range" style="width: 45%;">
							{{ item.tcsLabel }}{{ item.tcs }}
						</view>
						<view class="left-range" style="width: 45%;">
							{{ item.anLabel }}{{ item.an }}
						</view>
						<view class="left-range" style="width: 10%;">
							<u-button type="primary" @click="openDetailPage(item)" text="详情" size="mini"></u-button>
						</view>
					</view>
				</view>
				
				<!-- 详情 -->
				<u-popup customStyle="padding:40px 5px 0 5px" :show="showModalGroupAchieve" mode="bottom" :round="12" @close="closePopupGroupAchieve" closeable closeOnClickOverlay safeAreaInsetBottom>
					<view style="height: calc(100vh - 200px);">
						<view class="u-pop-box">
							<view class="pop-box-name">
								组: {{ groupDetailInfo.groupName }}
							</view>
							<!-- 总成绩 总hejin -->
							<view class="achieve-box">
								<view class="">
									{{ groupDetailInfo.anLabel }} {{ groupDetailInfo.an }}
								</view>
								<view class="achieve-box-last">
									{{ groupDetailInfo.tcsLabel }} {{ groupDetailInfo.tcs }}
								</view>
							</view>
							
							<!-- 列表 -->
							<table class="table table_wrap" v-if="groupDetailInfo.tableItemVoList && groupDetailInfo.tableItemVoList.length>0">
								<tbody>
									<tr class="table_tr" v-for="(val,i) in groupDetailInfo.tableItemVoList" :key="i">
										<td class="table_content">
											<p>{{ val.levelStr }}</p>
										</td>
										<td class="table_content">
											<p>{{ val.value }}</p>
										</td>
									</tr>
								</tbody>
							</table>
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
				searchForm:{
					dailyDate: null,
				},
				datalist: [],
				indexList: [],
				groupDetailInfo: {},
				showModalGroupAchieve: false,
				
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
				this.getGroupList();
			}, 
			// 打开弹出层
			openDetailModal(item){
				this.showModal = true;
				this.activeData = item;
			},
			// 关闭弹出层
			closePopup(){
				this.showModal = false;
			},
			
			// 获取分组成绩列表
			getGroupList(){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					dailyDate: this.searchForm.dailyDate,
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.$u.http.post('/app/api/score/groupitems', params).then(res => {
					if(res.code == 0){
						this.indexList = res.data.detailItemVoList;
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
			
			// 打开详情页
			openDetailPage(item){
				this.groupDetailInfo = item;
				this.showModalGroupAchieve = true;
			},
			// 关闭
			closePopupGroupAchieve(){
				this.showModalGroupAchieve = false;
			}
		},
		created() {
			this.getGroupList();
		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		margin: 10px 0;
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
			width: 50%;
			margin: 20px auto;
		}
		
		.table_title {
			padding: 10px;
			left: 0px;
			position: sticky; // 表头还是靠粘性固定
			font-weight: bold;
			text-align: center;
			border-right: 1px solid rgb(232, 232, 232);
		}
		
		.table_title p,  .table_content p{
			// width: 60px;
			font-size: 12px;
		}
		
		.table_content {
			padding: 10px;
		}
		.table_content:not(:last-child){
			border-right: 1px solid rgb(232, 232, 232);
		}
		
		.table_tr{
			border: 1px solid rgb(232, 232, 232);
		}
</style>