<template>
	<view class="content">
		<NoticeBar />
		<menuBar />
		<u-swiper />
<!-- 	<button @click="getData">获取接口数据</button>
		<button @click="login">denglu</button> -->
		<!-- table -->
		<view class="claim-content" v-for="(item, index) in indexList" :key="index">
			<view class="claim-content-top">
				<view class="claim-content-top-left">
					<span>学生：</span>
					<span>【{{ item.name }}】</span>
				</view>
				<view class="claim-content-top-right">
					<span>申请加入班级</span>
				</view>
			</view>
			<view class="claim-content-bottom">
				<view class="claim-content-bottom-left">
					<span>{{item.time}}</span>
				</view>
				<view class="claim-content-bottom-right">
					<span style="display: inline-block;">
						<u-button type="primary" text="认领" size="mini"></u-button>
					</span>
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
				indexList: [
					{
						name:"KK疯狂中nuts",
						time:"2023-09-06 11:02"
					},
					{
						name:"KK疯狂中nutsaaa",
						time:"2023-09-06 11:02"
					},
					{
						name:"KK疯狂中nutsv",
						time:"2023-09-06 11:02"
					},
					{
						name:"KK疯狂中",
						time:"2023-09-06 11:02"
					},
					{
						name:"KK疯狂中nuts",
						time:"2023-09-06 11:02"
					},
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
			this.loadmore()
		},
		onShow() {
			this.$store.commit("changeTabbarIndex",0);
			this.init();
			this.getData();
		},
		methods: {
			async getData() {
				let params = {
					hostName: "",
					labelId: "",
					pageIndex: 1,
					pageSize: 10,
					projectId: "",
				}
				// const response = await this.$api.home.getTableData(params)
				uni.$u.http.post('/nativesphere/host/getHostList', params).then(res => {
					console.log("res",res)
				}).catch((err) =>{
					console.log("err",err)
				})
			},
			// async login() {
			// 	const response = await this.$api.user.login()
			// },
			
			// 滚动触底事件
			scrolltolower() {
				this.loadmore();
				console.log("触底啦...")
			},
			loadmore() {
				for (let i = 0; i < this.indexList.length; i++) {
					
				}
			},
			
			// 初始化接口
			async init() {
				let params = {
					_tk:uni.getStorageSync("token")
				}
				uni.$u.http.post('/app/api/main/init', params).then(res => {
					console.log("res",res)
				}).catch((err) =>{
					console.log("err",err)
				})
			},
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
			.claim-content-top-left{
				width: 70%;
			}
			.claim-content-top-right{
				width: 30%;
			}
		}
		.claim-content-bottom{
			display: flex;
			justify-content: space-between;
			padding-right: 10px;
		}
	}
</style>