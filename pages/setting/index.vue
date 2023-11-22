<template>
	<view class="content">
		<NoticeBar />
		<u-cell-group style="margin-top: 10px">
			<u-cell
			    title="修改密码"
			    isLink
			    url="/pages/setting/updatePassword"
			></u-cell>
			<u-cell
			    title="消息通知"
			    isLink
			    url="/pages/setting/notifySetting"
			></u-cell>
			<u-cell
			    title="切换账号"
			    isLink
			    url="/pages/componentsB/badge/badge"
			></u-cell>
			<u-cell
			    title="退出"
			    isLink
			    url="/pages/componentsB/badge/badge"
			></u-cell>
		</u-cell-group>
		
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
				title: '设置'
			}
		},
		components:{
			customTabBar,
			NoticeBar
		},
		onShow() {
			this.$store.commit("changeTabbarIndex",3);
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	
</style>
