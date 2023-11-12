<template>
	<view class="content">
		<NoticeBar />
<!-- 	<button @click="getData">获取接口数据</button>
		<button @click="login">denglu</button> -->
		<u-swiper :list="swiperList" @change="swiperChange" @click="swiperClick"></u-swiper>
		
		<!-- 底部导航栏组件 -->
		<customTabBar></customTabBar>
	</view>
</template>

<script>
	import customTabBar from "@/components/tabbar/tabbar.vue";
	import NoticeBar from "@/components/notify/notifyBar.vue";
	export default {
		data() {
			return {
				title: '首页',
				count: 4,
				value: 2,

				swiperList: [
					{url:require('@/static/image/1.jpg')},
					{url:require('@/static/image/2.jpg')},
					{url:require('@/static/image/3.jpg')},
				],
			}
		},
		components:{
			customTabBar,
			NoticeBar
		},
		onLoad() {

		},
		onShow() {
			this.$store.commit("changeTabbarIndex",0);
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
			// 轮播图change事件
			swiperChange(){},
			
			// 轮播图点击事件
			swiperClick(){},
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 40rpx;
	}
</style>