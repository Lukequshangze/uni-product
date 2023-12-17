<template>
	<!-- 认领页面 -->
	<view class="content">
		<NoticeBar />
		<menuBar />
		<u-swiper />
		<u-datetime-picker
			:show="pickerShow"
			v-model="valueTime"
			mode="date"
			@confirm="getDate"
			@cancel="pickerClose"
			closeOnClickOverlay
			@change="changeStartTime"
		></u-datetime-picker>
		<view class="search-box">
			  <u--input shape="circle" placeholder="起始时间" border="surround" v-model="searchForm.startTime" @focus="selectStartTime"></u--input>
			  <span class="time-line"> - </span>
			  <u--input shape="circle" placeholder="结束时间" border="surround" v-model="searchForm.endTime" @focus="selectEndTime"></u--input>
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
							<u-button @tap="getClaimList" type="primary" size="mini">查询</u-button>
						</template>
				<!-- #ifndef APP-NVUE -->
				</u-input>
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				</u--input>
				<!-- #endif -->
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
			<view class="claim-content" v-for="(item, index) in indexList" :key="index">
				<view class="claim-content-top">
					<view class=""></view>
					<view class="claim-content-time">
						<span>{{item.sendTimeStr}}</span>
					</view>
				</view>
				<view class="claim-content-bottom">
					<view class="claim-content-top">
						<view class="">
							{{ item.content }}
						</view>
						<!-- <view class="claim-content-top-left">
							<span>学生:</span>
							<span>【
								<span style="color: #D9001B;">{{ item.name }}</span>
							】</span>
						</view>
						<view class="claim-content-top-right">
							<span>申请加入班级</span>
						</view> -->
					</view>
					<view class="claim-content-bottom-right">
						<span style="display: inline-block;">
							<u-button type="primary" text="认领" size="mini"></u-button>
						</span>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="u-page">
			<u-list
				@scrolltolower="scrolltolower"
			>
				<u-list-item
					v-for="(item, index) in indexList"
					:key="index"
				>
					<u-cell>
						<view class="" slot="icon" style="width: 100%;">
							<view class="">
								<span>学生：【</span>
								<span>{{ item.name }}</span>
								<span>】申请加入班级</span>
							</view>
							<view class="">
								<span>{{item.time}}</span>
								<span style="display: inline-block;">
									<button>认领</button>
								</span>
							</view>
						</view>
						
					</u-cell>
				</u-list-item>
			</u-list>
		</view> -->
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
				title: '首页',
				count: 4,
				value: 2,
				pickerShow:false,
				valueTime: Number(new Date()),
				inputType: "start",
				searchForm:{
					nk:"",  // 昵称
					valueData:"",
					page: 1,
					limit: 20,
					startTime: "",
					endTime: "",
				},
				indexList: [
					{
						name:"KK疯狂中nuts",
						time:"2023-09-06 11:02"
					}
				]
			}
		},
		components:{
			customTabBar,
			NoticeBar,
			menuBar,
			uSwiper,
		},
		onLoad() {
			
		},
		onShow() {
			this.$store.commit("changeTabbarIndex",0);
		},
		methods: {
			//  -------------------- 时间选择器 start --------------------
			// 获取选择时间的时间戳
			getDate(e) {
				// e.value为选中事件的时间戳   e.mode为事件格式
				console.log(e)
				if(this.inputType === "start"){
					let date = new Date(this.valueTime);
					if(!this.searchForm.startTime){
						this.searchForm.startTime = this.dateFormatter(
							"yyyy-MM-dd",
							date
						);
					}
				}else if(this.inputType === "end"){
					let date = new Date(this.valueTime);
					if(!this.searchForm.endTime){
						this.searchForm.endTime = this.dateFormatter(
							"yyyy-MM-dd",
							date
						);
					}
				}
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
				
			},
			// 选择结束时间
			selectEndTime() {
				this.pickerShow = true;
				this.inputType = "end";
			},
			// 修改时间
			changeStartTime(e) {
				console.log("e", e)
				let date = new Date(e.value);
				if (this.inputType === "start") {
					this.searchForm.startTime = this.dateFormatter(
						"yyyy-MM-dd",
						date
					);
				} else if (this.inputType === "end") {
					this.searchForm.endTime = this.dateFormatter(
						"yyyy-MM-dd",
						date
					);
				}
			},
			//  -------------------- 时间选择器 end --------------------			
			// 获取认领数据
			getClaimList(type){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					beginDate: this.searchForm.startTime,
					endDate: this.searchForm.endTime,
					nk: this.searchForm.nk,
					page: this.searchForm.page,
					limit: this.searchForm.limit,    // 页码 默认20
					start: "",
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.$u.http.post('/app/api/main/cm/xylist', params).then(res => {
					if(res.code == 0){
						console.log("res",res)
						this.total = res.data.count;
						if(type && type==="more"){
							res.data.msgInfoVoList.forEach(item=>{
								this.indexList.push(item)
							})
						}else{
							this.indexList = res.data.msgInfoVoList;
						}
						//隐藏加载框
						uni.hideLoading();
					}
				}).catch((err) =>{
					this.$api.msg("加载失败");
					//隐藏加载框
					uni.hideLoading();
				})
			},
			async onReachBottom() {
				if(this.total > this.searchForm.page * this.searchForm.limit){
					this.searchForm.page += 1;
					this.getClaimList("more");
				}else{
					this.$api.msg("已加载全部数据");
				}
			},
			
			// 初始化接口
			async init() {
				console.log("uni.getStorageSync(''wp_token')",uni.getStorageSync("wp_token"))
				let params = {
					_tk:uni.getStorageSync("wp_token")
				}
				uni.$u.http.post('/app/api/main/init', params).then(res => {
					
				}).catch((err) =>{
					this.$api.msg("加载失败");
					//隐藏加载框
					uni.hideLoading();
				})
			},
		},
		created() {
			this.getClaimList();
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 40rpx;
	}
	.claim-content{
		background: #f2f2f2;
		margin-top: 5px;
		padding: 5px 8px;
		.claim-content-top{
			display: flex;
			justify-content: space-between;
			.claim-content-time{
				padding:0 10px 5px 0;
			}
		}
		.claim-content-bottom{
			display: flex;
			justify-content: space-between;
			padding-right: 10px;
		}
	}
	.search-box{
		display: flex;
		margin-top: 10px;
		.time-line{
			position: relative;
			top: 8px;
			margin: 0 10px;
		}
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
</style>