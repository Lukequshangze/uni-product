<template>
	  <view>
	    <view class="content">
	    	<image class="notify-image" src="@/static/icon/notify-bring.png" mode=""></image>
	    	<image class="notify-image" src="@/static/icon/notify-claim.png" mode="" @click="toBringPage"></image>
	    </view>
		<view class="clear-both">
			
		</view>
	  </view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods: {
			toBringPage() {
				uni.navigateTo({
					url: "/pages/bring/index"
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.content{
		float:right;
		.notify-image {
			height: 20px;
			width: 20px;
			padding: 2px 10px 0 0;
		}
	}
	.clear-both{
		clear:both;
	}
</style>