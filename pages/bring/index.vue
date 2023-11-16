<template>
	<view class="content">
		<NoticeBar />
		<menuBar />
		<text class="title">{{title}}</text>
		
		<!-- 底部导航栏组件 -->
		<customTabBar></customTabBar>
	</view>
</template>

<script>
	import customTabBar from "@/components/tabbar/tabbar.vue";
	import NoticeBar from "@/components/notify/notifyBar.vue";
	import menuBar from "@/components/tabbar/menuBar.vue";
	export default {
		data() {
			return {
				title: '带入'
			}
		},
		components:{
			customTabBar,
			NoticeBar,
			menuBar
		},
		onShow() {
			this.$store.commit("changeTabbarIndex",2);
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	
</style>
