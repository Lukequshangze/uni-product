<template>
	<!-- 课程管理 -->
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
				<view class="" style="display: flex;margin-top: 10px;">
					<text style="position: relative;top: 5px;margin-right: 10px;">分组名: </text>
					<u-input placeholder="请输入分组名" v-model="searchForm.gn"></u-input>
				</view>
				<view class="query-content">
					<view class="query-content-select">
						<uni-data-select v-model="chosetype" :localdata="studentSelect"></uni-data-select>
					</view>
					<view class="query-content-input">
						<view class="u-demo-block__content">
							<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
							<!-- #ifndef APP-NVUE -->
							<u-input placeholder="请输入" v-model="searchForm.valueData">
							<!-- #endif -->
								<!-- #ifdef APP-NVUE -->
								<u--input placeholder="请输入">
								<!-- #endif -->
									<template slot="suffix">
										<!-- @tap 手指触摸离开时触发 -->
										<u-button @tap="getCourseManageList" :text="tips" type="primary"
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
				        icon="http://cdn.uviewui.com/uview/empty/data.png"
				>
				</u-empty>
			</view>
			<view class="" v-if="!indexList || indexList.length>0">
				<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 14px;">
					<view class="claim-content-bottom">
						<view class="left-range">
							{{ item.sn }}
						</view>
						<view class="left-range">
							{{ item.anLabel }}{{ item.an }}
						</view>
						<view class="left-range">
							{{ item.cnLabel }}{{ item.cn }}
						</view>
						<view class="left-range">
							<u-button type="primary" text="详情" size="mini"></u-button>
						</view>
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
				searchForm: {
					uid: "",
					nk: "",
					cn: "",
					an: "",
					page: 1,
					limit: 20,
					gn: "",
					valueData: "",
				},
				datalist: [],
				indexList: [],
				
				chosetype: "",
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
			// 获取老师管理信息
			getCourseManageList(type){
				if(this.chosetype === 0){
					this.searchForm.uid = Number(this.searchForm.valueData);
					this.searchForm.nk = "";
					this.searchForm.cn = "";
					this.searchForm.an = "";
				}else if(this.chosetype === 1){
					this.searchForm.nk = this.searchForm.valueData;
					this.searchForm.uid = "";
					this.searchForm.cn = "";
					this.searchForm.an = "";
				}else if(this.chosetype === 2){
					this.searchForm.cn = this.searchForm.valueData;
					this.searchForm.uid = "";
					this.searchForm.an = "";
					this.searchForm.nk = "";
				}else if(this.chosetype === 3){
					this.searchForm.an = this.searchForm.valueData;
					this.searchForm.uid = "";
					this.searchForm.nk = "";
					this.searchForm.cn = "";
				}
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					nk: this.searchForm.nk,
					an: this.searchForm.an,         // 所属
					cn: this.searchForm.cn,         // 所属
					uid: this.searchForm.uid,
					gn: this.searchForm.gn,         // 分组名
					page: this.searchForm.page,
					limit: this.searchForm.limit,   // 默认 20
					start: "",
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.$u.http.post('/app/api/sys/courselist', params).then(res => {
					if(res.code == 0){
						this.total = res.data.count;
						if(type && type==="more"){
							res.data.itemVoList.forEach(item=>{
								this.indexList.push(item)
							})
						}else{
							this.indexList = res.data.itemVoList;
						}
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
					this.getCourseManageList("more");
				}else{
					this.$api.msg("已加载全部数据");
				}
			},

		},
		created() {
			this.getCourseManageList();
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
</style>