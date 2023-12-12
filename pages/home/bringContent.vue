<template>
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
							<u-button @tap="getBringList" type="primary" size="mini">查询</u-button>
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
		<view v-if="indexList && indexList.length>0">
			<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 14px;">
				<view class="claim-content-top">
					<view class="claim-content-top-left">
						<span>{{ item.nicknameLabel }}</span>
						<!-- 20231212 缺少nickname字段 -->
						<span style="color: #D9001B;">【{{ item.nickname }}】</span>
					</view>
					<view class="claim-content-top-right">
						<span>{{ item.freeScoreLabel }}</span>
						<span>{{ item.freeScore }}</span>
					</view>
				</view>
				<view class="claim-content-bottom">
					<view class="claim-content-bottom-left">
						<span>{{ item.titleLabel }}</span> 
						<span>{{ item.title }}</span>
					</view>
					<view class="claim-content-bottom-right">
						<span>{{ item.contentLabel }}
						<span style="font-weight: bold;font-size: 16px;color: #d9001B">{{ item.content }}</span>
						</span>
					</view>
				</view>
				<view class="claim-content-bottom">
					<view class="claim-content-bottom-left">
						<view class="">
							{{ item.sendTimeStr }}
						</view>
					</view>
					<view class="claim-content-bottom-right">
						<span style="display: flex;">
							<u-button type="primary" text="同意" size="mini" style="margin-right:15px"></u-button>
							<u-button text="拒绝" size="mini"></u-button>
						</span>
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
				indexList: []
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
			getBringList(type){
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
				uni.$u.http.post('/app/api/main/cm/drlist', params).then(res => {
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
					console.log("err",err)
				})
			},
			async onReachBottom() {
				if(this.total > this.searchForm.page * this.searchForm.limit){
					this.searchForm.page += 1;
					this.getBringList("more");
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
					console.log("err",err)
				})
			},
		},
		created() {
			this.getBringList();
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
		line-height: 24px;
		.claim-content-top{
			display: flex;
			.claim-content-top-left{
				width: 60%;
			}
			.claim-content-top-right{
				width: 40%;
			}
		}
		.claim-content-bottom{
			display: flex;
			justify-content: space-between;
			// padding-right: 10px;
			.claim-content-bottom-left{
				width: 60%;
			}
			.claim-content-bottom-right{
				width: 40%;
			}
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