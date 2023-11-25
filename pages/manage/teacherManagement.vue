<template>
	<!-- 老师管理 -->
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
							<!-- 注意:由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
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
			<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 14px;">
				<view class="">
					<uni-row class="demo-uni-row" :width="nvueWidth">
						<uni-col :span="6">
							<view class="demo-uni-col dark">
								上:abe-bella
							</view>
						</uni-col>
						<uni-col :span="6">
							<view class="demo-uni-col light">
								输赢:3000
							</view>
						</uni-col>
						<uni-col :span="6">
							<view class="demo-uni-col dark">
								战奖罚:-0.25
							</view>
						</uni-col>
						<uni-col :span="6">
							<view class="demo-uni-col light" style="display: flex;">
								<span>状态:</span>
								<u-switch size="14" style="position: relative;top: 5px;left: 3px;" v-model="bringStatus" @change="bringStatusChange"></u-switch>
							</view>
						</uni-col>
					</uni-row>
					
					<uni-row class="demo-uni-row" :width="nvueWidth">
						<uni-col :span="6">
							<view class="demo-uni-col dark" style="font-size: 10px;color: #d9001b;">
								名称：2/4级别
							</view>
						</uni-col>
						<uni-col :span="6">
							<view class="demo-uni-col light">
								信额:300
							</view>
						</uni-col>
						<uni-col :span="6">
							<view class="demo-uni-col dark">
								基奖罚:-0.1
							</view>
						</uni-col>
						<uni-col :span="6">
							<view class="demo-uni-col light" style="display: flex;">
								<span>带入:</span>
								<u-switch size="14" style="position: relative;top: 5px;left: 3px;" v-model="bringSwitch" @change="bringStatusChange"></u-switch>
							</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row" :width="nvueWidth">
						<uni-col :span="6">
							<view class="demo-uni-col dark">
								返比:0.98
							</view>
						</uni-col>
						<uni-col :span="6">
							<view class="demo-uni-col light">
								押金:30000
							</view>
						</uni-col>
						<uni-col :span="6">
							<view class="demo-uni-col dark">
								禁    用:否
							</view>
						</uni-col>
						<uni-col :span="6">
							<view class="demo-uni-col light" style="width: 40px;">
								<u-button type="primary" text="编辑" size="mini"></u-button>
							</view>
						</uni-col>
					</uni-row>
				</view>
				<view class=""></view>
				<view class=""></view>
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
				
				bringStatus: false,// 状态
				bringSwitch: false,// 状态
				indexList: [
					{
						name:"KK疯狂中nuts",
						time:"2023-09-06"
					},
					{
						name:"KK疯狂中nutsaaa",
						time:"2023-09-06"
					},
					{
						name:"KK疯狂中nutsv",
						time:"2023-09-06"
					},
					{
						name:"KK疯狂中",
						time:"2023-09-06"
					},
					{
						name:"KK疯狂中nuts",
						time:"2023-09-06"
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
		::v-deep{
			.u-button--mini{
				min-width: 0 !important;
			}
		}
	}
</style>