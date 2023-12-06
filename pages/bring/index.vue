<template>
	<!-- 带入 -->
	<view class="content">
		<NoticeBar />
		<menuBar />
		<u-swiper />
		<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 14px;">
			<view class="claim-content-top">
				<view class="claim-content-top-left">
					<span style="color: #d9001B">KK疯狂中nuts</span>
				</view>
				<view class="claim-content-top-right">
					<span>{{ item.time }}</span>
				</view>
			</view>
			<view class="claim-content-bottom">
				
				<view class="">
					带:2400
				</view>
				<view class="left-range">
					手:332
				</view>
				<view class="left-range">
					绩:2016
				</view>
				<view class="left-range">
					属:jaz5
				</view>
				<view class="left-range">
					<u-button type="primary" text="详情" size="mini"></u-button>
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
			this.$store.commit("changeTabbarIndex",2);
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
				const response = await this.$api.home.getTableData(params);
			},
			async login() {
				const response = await this.$api.user.login()
			},
			
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
	.wrap {
		padding: 40rpx;
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