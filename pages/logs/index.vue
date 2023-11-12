<template>
	<view class="content">
		<NoticeBar />
		<text class="title">{{title}}</text>
		
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
				title: '日志'
			}
		},
		components:{
			customTabBar,
			NoticeBar
		},
		onShow() {
			this.$store.commit("changeTabbarIndex",1);
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	
</style>
