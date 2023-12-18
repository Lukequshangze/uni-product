<template>
	<!-- 分组管理 -->
	<view class="content">
		<NoticeBar />
		<menuBar />
		<u-swiper />
		<view>
			<view class="query-content">
				<view class="query-content-select">
					分组名: 
				</view>
				<view class="query-content-input">
					<view class="u-demo-block__content">
						<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
						<!-- #ifndef APP-NVUE -->
						<u-input placeholder="请输入" v-model="searchForm.gn">
						<!-- #endif -->
							<!-- #ifdef APP-NVUE -->
							<u--input placeholder="请输入">
							<!-- #endif -->
								<template slot="suffix">
									<!-- @tap 手指触摸离开时触发 -->
									<u-button @tap="getGroupManageList" type="primary" size="mini">查询</u-button>
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
			<!-- 无数据时 -->
			<view style="margin-top: 15px;" class="" v-if="!indexList || indexList.length===0">
				<u-empty
				        mode="data"
				        icon="http://cdn.uviewui.com/uview/empty/data.png"
				>
				</u-empty>
			</view>
			<view class="" v-if="!indexList || indexList.length > 0">
				<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 14px;">
					<view class="claim-content-bottom">
						<view class="left-range" style="width: 20%;">
							{{ item.gIdLabel }}{{ item.gId }}
						</view>
						<view class="left-range" style="width: 30%;">
							{{ item.gnLabel }}{{ item.gn }}
						</view>
						<view class="left-range" style="width: 25%;">
							{{ item.csLabel }}{{ item.cs }}
						</view>
						<view class="left-range" style="display: flex">
							<u-button type="primary" text="额备" size="mini"></u-button>
							<u-button type="primary" text="移除" size="mini" style="margin-left: 5px;"></u-button>
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
				searchForm:{
					gn: "",
				},
				datalist: [],
				indexList: [],
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
		},
		methods: {
			getGroupManageList(type){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					gn: this.searchForm.gn,
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.$u.http.post('/app/api/sys/grouplist', params).then(res => {
					if(res.code == 0){
						this.total = res.data.count;
						this.indexList = res.data.itemVoList;
						uni.hideLoading();
					}else{
						this.$api.msg("加载失败");
					}
				}).catch((err) =>{
					//隐藏加载框
					uni.hideLoading();
				})
			},
		},
		created() {
			this.getGroupManageList();
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
			width: 15%;
			position: relative;
			top: 5px;
		}

		.query-content-input {
			margin-left: 1%; 
			width: 80%;
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
			padding-right: 0px;
		}
		.left-range{
			
		}
	}
</style>