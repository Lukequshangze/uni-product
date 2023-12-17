<template>
	<!-- 学生管理 -->
	<view class="content">
		<NoticeBar />
		<menuBar />
		<u-swiper />
		<view>
			<view class="">
				<!-- <u-datetime-picker :show="pickerShow" v-model="valueTime" mode="date" @confirm="getDate"
					@close="pickerClose" @change="changeStartTime"></u-datetime-picker>
				<view class="search-box">
					<u--input shape="circle" placeholder="起始时间" border="surround" v-model="startTime"
						@focus="selectStartTime"></u--input>
					<span class="time-line"> - </span>
					<u--input shape="circle" placeholder="结束时间" border="surround" v-model="endTime"
						@focus="selectEndTime"></u--input>
				</view> -->
				<view class="group-search">
					<span class="search-gn">分组名: </span>
					<u--input class="gn-ipt" placeholder="请输入分组名称" border="surround" v-model="searchForm.gn"></u--input>
				</view>
				<view class="query-content">
					<view class="query-content-select">
						<uni-data-select v-model="chosetype" :localdata="studentSelect"
							@change="changeStudentSelect"></uni-data-select>
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
										<u-button @tap="getStudentManage" type="primary"
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
			<view style="margin-top: 15px;" class="" v-if="indexList && indexList.length===0">
				<u-empty
				        mode="data"
				        icon="http://cdn.uviewui.com/uview/empty/data.png"
				>
				</u-empty>
			</view>
			<view class="" v-if="indexList && indexList.length>0">
				<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 14px;">
					<view class="">
						<uni-row class="demo-uni-row">
							<uni-col :span="6">
								<view class="demo-uni-col dark" style="font-size: 10px;color: #d9001b;">
									{{ item.studentIdLabel }}: {{ item.studentId }}
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col light">
									{{ item.creditScoreLabel }}: {{ item.creditScore }}
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col dark">
									{{ item.isBlackLabel }}: {{ item.isBlack }}
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col light" style="display: flex;">
									<u-button type="primary" text="额备" size="mini"></u-button>
									<u-button type="primary" text="分组" size="mini" style="margin-left: 2px;"></u-button>
								</view>
							</uni-col>
						</uni-row>
						
						<uni-row class="demo-uni-row">
							<uni-col :span="6">
								<view class="demo-uni-col dark">
									{{ item.nickName }}
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col light">
									{{ item.reCreditLabel }}: {{ item.reCredit }}
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col dark">
									{{ item.cnLabel }}: <span style="font-size: 10px;">{{ item.cn }}</span>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col light" style="display: flex;">
									<u-button type="primary" text="充" size="mini"></u-button>
									<u-button type="primary" text="结" size="mini" style="margin-left: 2px;"></u-button>
								</view>
							</uni-col>
						</uni-row>
						
						<uni-row class="demo-uni-row">
							<uni-col :span="18">
								<view class="demo-uni-col dark">
									{{ item.groupLabel }}
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col light" style="display: flex;">
									<u-button type="primary" text="移除" size="mini"></u-button>
									<u-button type="primary" text="拉黑" size="mini" style="margin-left: 2px;"></u-button>
								</view>
							</uni-col>
						</uni-row>
					</view>
					<view class=""></view>
					<view class=""></view>
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
				selectType: "",
				datalist: [],
				total: 0,
				searchForm:{
					uid:"", // id
					nk:"",  // 昵称
					cn:"",  // 备注
					an:"",  // 所属
					valueData:"",
					page: 1,
					limit: 20,
					gn:"",
				},
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
			// 下拉选择框事件
			changeStudentSelect(e){
				if(!e){
					this.searchForm.valueData = "";
				}
				this.selectType = e;
			},
			// 查询
			getStudentManage(type){
				if(this.selectType === 0){
					this.searchForm.uid = Number(this.searchForm.valueData);
					this.searchForm.nk = "";
					this.searchForm.cn = "";
					this.searchForm.an = "";
				}else if(this.selectType === 1){
					this.searchForm.nk = this.searchForm.valueData;
					this.searchForm.uid = "";
					this.searchForm.cn = "";
					this.searchForm.an = "";
				}else if(this.selectType === 2){
					this.searchForm.cn = this.searchForm.valueData;
					this.searchForm.uid = "";
					this.searchForm.an = "";
					this.searchForm.nk = "";
				}else if(this.selectType === 3){
					this.searchForm.an = this.searchForm.valueData;
					this.searchForm.uid = "";
					this.searchForm.nk = "";
					this.searchForm.cn = "";
				}
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					uid: this.searchForm.uid,
					nk: this.searchForm.nk,
					cn: this.searchForm.cn,
					an: this.searchForm.an,
					page: this.searchForm.page,
					limit: this.searchForm.limit,    // 页码 默认20
					start: 0,
					gn: this.searchForm.gn,   						 // 分组名
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.$u.http.post('/app/api/sys/studentlist', params).then(res => {
					if(res.code == 0){
						console.log("res",res)
						this.total = res.data.count;
						if(type && type==="more"){
							res.data.itemVoList.forEach(item=>{
								this.indexList.push(item)
							})
						}else{
							this.indexList = res.data.itemVoList;
						}
						//隐藏加载框
						uni.hideLoading();
					}
				}).catch((err) =>{
					console.log("err",err)
				})
			},
			async onReachBottom() {
				if(this.total > this.searchForm.page * this.searchForm.limit){
					this.searchForm.page += 1;
					this.getStudentManage("more");
				}else{
					this.$api.msg("已加载全部数据");
				}
			},
		},
		created(){
			this.getStudentManage();
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
		font-size: 12px !important;
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
	.group-search{
		display: flex;
		margin-top: 10px;
		.search-gn{
			position: relative;
			top: 6px;
			width: 80px;
		}
		.gn-ipt{
			width: calc( 100vh - 80px );
		}
	}
</style>