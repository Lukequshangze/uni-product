<template>
	<!-- 老师成绩 -->
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
			<view class="teacher-table">
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
					:data="data">
				</zb-table>
			</view>
			<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 14px;">
				<view class="claim-content-top">
					<view class="claim-content-top-left">
						<span style="color: #d9001B">{{ item.name }}</span>
					</view>
					<view class="claim-content-top-left">
						<span>总和:12312</span>
					</view>
					<view class="claim-content-top-left">
						<span>返比:312312</span>
					</view>
					<view class="claim-content-top-right">
						<span>{{ item.time }}</span>
					</view>
				</view>
				<view class="claim-content-top">
					<view class="claim-content-top-left">
						总计:1537
					</view>
					<view class="claim-content-top-left">
						成绩:1537
					</view>
					<view class="claim-content-top-left">
						奖罚:1537
					</view>
					<view class="claim-content-top-left">
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
						name:"KK疯",
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
				
				column:[
				  { name: 'name', label: '总',fixed:false,emptyString:'--' },
				  { name: 'address', label: '金',emptyString:'--'},
				  { name: 'number', label: '手'},
				  { name: 'result', label: '值' },
				],
				
				data:[
				  {
					result: '670',
					name: '123',
					number:'300',
					address:'900',
				  },
				  {
					result: '671',
					name: '312',
					number:'301',
					address:'900',
				  },
				  {
					result: '672',
					name: '123',
					number:'311',
					address:'900',
				  },
				  {
					result: '673',
					name: '314',
					number:'321',
					address:'900',
				  },
				  {
					result: '674',
					name: '135',
					number:'330',
					address:'900',
				  }
				]  
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
</style>