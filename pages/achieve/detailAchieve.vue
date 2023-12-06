<template>
	<!-- 明细成绩 -->
	<view class="content">
		<NoticeBar />
		<menuBar />
		<u-swiper />
		<view>
			<view class="">
				<u-datetime-picker :show="pickerShow" v-model="valueTime" mode="date" @confirm="getDate"
					@close="pickerClose" @change="changeStartTime"></u-datetime-picker>
				<view class="search-box">
					<u--input shape="circle" placeholder="起始时间" border="surround" v-model="startTime"
						@focus="selectStartTime"></u--input>
					<span class="time-line"> - </span>
					<u--input shape="circle" placeholder="结束时间" border="surround" v-model="endTime"
						@focus="selectEndTime"></u--input>
				</view>
				<view class="query-content">
					<view class="query-content-select">
						<uni-data-select v-model="chosetype" :localdata="studentSelect"
							@change="change"></uni-data-select>
					</view>
					<view class="query-content-input">
						<view class="u-demo-block__content">
							<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
							<!-- #ifndef APP-NVUE -->
							<u-input placeholder="请输入">
							<!-- #endif -->
								<!-- #ifdef APP-NVUE -->
								<u--input placeholder="请输入">
								<!-- #endif -->
									<template slot="suffix">
										<!-- @tap 手指触摸离开时触发 -->
										<u-button @tap="getStudentList" :text="tips" type="primary"
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
			<view class="detail-table">
				<!-- 表格 特殊表格，采用原生方式处理 -->
				<view class="wrap">
					<view class="table_wrap">
						<table class="table">
							<thead> <!-- thead标签在这里已经不代表表头了-->
								<tr>  <!-- 每个tr标签的第一个td标签为表头-->
									<td class="table_title">
										<p>汇</p>
									</td>
									<td class="table_content">
										<p>总成绩</p>
									</td>
									<td class="table_content">
										<p>德24</p>
									</td><td class="table_content">
										<p>德48</p>
									</td><td class="table_content">
										<p>德2550</p>
									</td><td class="table_content">
										<p>奥36</p>
									</td><td class="table_content">
										<p>金总和</p>
									</td>
								</tr>
							</thead>
							<tbody>
								<tr class="table_tr">
									<td class="table_title">
										<p>合计</p>
									</td>
									<td class="table_content">
					                    <p>67182</p>
									</td>
									<td class="table_content">
									    <p>67182</p>
									</td>
									<td class="table_content">
									    <p>67182</p>
									</td>
									<td class="table_content">
									    <p>67182</p>
									</td>
									<td class="table_content">
									    <p>67182</p>
									</td>
									<td class="table_content">
									    <p>1231231</p>
									</td>
								</tr>
							</tbody>
						</table>
					</view>
				</view>
			</view>
			<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 14px;">
				<view class="claim-content-top">
					<view class="claim-content-top-left" style="width: 30%;">
						<span style="color: #d9001B">KK疯狂中nuts</span>
					</view>
					<view class="" style="width: 20%;">
						所属:jaz5
					</view>
					<view class="claim-content-top-right" style="width: 50%;">
						<span>备注:{{ item.value }}</span>
					</view>
				</view>
				<view class="claim-content-bottom">
					<view class="left-range">
						总成绩:2016
					</view>
					<view class="left-range">
						总和金:jaz5
					</view>
					<view class="left-range">
						<u-button type="primary" text="详情" size="mini"></u-button>
					</view>
				</view>
			</view>
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
				indexList: [
					{
						name:"KK疯狂中nuts",
						value:"淳最好的最好的史"
					},
					{
						name:"KK疯狂中nutsaaa",
						value:"淳最好的最好的史"
					},
					{
						name:"KK疯狂中nutsv",
						value:"淳最好的"
					},
					{
						name:"KK疯狂中",
						value:"淳最好的最好的史111"
					},
					{
						name:"KK疯狂中nuts",
						value:"淳最好的最好的史zxcv"
					},
				],
				
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
			// 获取选择时间的时间戳
			getDate(e) {
				// e.value为选中事件的时间戳   e.mode为事件格式
				console.log(e)
				this.pickerClose();
			},
			// 关闭时间选择弹窗
			pickerClose() {
				this.pickerShow = false;
			},
			// 选择起始时间
			selectStartTime() {
				this.pickerShow = true;
				this.inputType = "start";
				let date = new Date(this.valueTime);
				this.startTime = this.dateFormatter(
					"yyyy-MM-dd",
					date
				);
			},
			// 选择结束时间
			selectEndTime() {
				this.pickerShow = true;
				this.inputType = "end";
				let date = new Date(this.valueTime);
				this.endTime = this.dateFormatter(
					"yyyy-MM-dd",
					date
				);
			},
			// 修改时间
			changeStartTime(e) {
				console.log("e", e)
				let date = new Date(e.value);
				if (this.inputType === "start") {
					this.startTime = this.dateFormatter(
						"yyyy-MM-dd",
						date
					);
				} else if (this.inputType === "end") {
					this.endTime = this.dateFormatter(
						"yyyy-MM-dd",
						date
					);
				}
			},

			// 查询
			getStudentList() {},
			
			// 滚动触底事件
			scrolltolower() {
				this.loadmore()
			},
			loadmore() {
				for (let i = 0; i < this.indexList.length; i++) {
					
				}
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
	}
	.detail-table{
		margin: 10px 0;
		.wrap {
			/* 这个只是用来居中内容 */
			align-items: center;
			display: flex;
			height: 100%;
			justify-content: center;
		}
		
		table thead th{
			font-size: 400;
		}
		
		.table_wrap {
			border: 1px solid rgb(232, 232, 232);
			overflow: auto;
			width: 100%;
		}
		
		.table {
			border-collapse: collapse;
			width: 100%;
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
			border-top: 1px solid rgb(232, 232, 232);
		}
	}
</style>