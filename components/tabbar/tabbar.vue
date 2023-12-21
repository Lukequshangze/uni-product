<template>
	<u-tabbar
		:value="index"
		@change="tabBarChange"
		:fixed="true"
		:placeholder="false"
		activeColor="#d81e06"
		:safeAreaInsetBottom="true"
	>
		<u-tabbar-item v-for="(item, index) in tabbarList" :key="index" :text="item.text">
			<image class="bar_img" slot='active-icon' :src="item.selectedIconPath"></image>
			<image class="bar_img" slot='inactive-icon' :src="item.iconPath"></image>
		</u-tabbar-item>
	</u-tabbar>
</template>

<script>
	export default {
		data() {
			return {
				tabbarList: [{
						"text": "首页",
						"pagePath": "/pages/home/index",
						"iconPath": "/static/tabbar/index.png",
						"selectedIconPath": "/static/tabbar/index-active.png"
					},
					{
						"text": "日志",
						"pagePath": "/pages/logs/index",
						"iconPath": "/static/tabbar/log.png",
						"selectedIconPath": "/static/tabbar/log-active.png"
					},
					{
						"text": "带入",
						"pagePath": "/pages/home/bringContent",
						"iconPath": "/static/tabbar/bring.png",
						"selectedIconPath": "/static/tabbar/bring-active.png"
					},
					{
						"text": "设置",
						"pagePath": "/pages/setting/index",
						"iconPath": "/static/tabbar/setting.png",
						"selectedIconPath": "/static/tabbar/setting-active.png"
					}]
			};
		},
		computed: {
			index(){
				return this.$store.state.tabbarIndex;
			}
		},
		methods: {
			// tabbar change事件
			tabBarChange(index){
				// index === tabbar下标
				uni.navigateTo({
					url: this.tabbarList[index].pagePath
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bar_img{
		width: 46rpx;
		height: 46rpx;
	}
</style>