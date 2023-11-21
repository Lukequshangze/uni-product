<template>
	<view class="">
		<u-swiper :list="swiperList" @change="swiperChange" @click="swiperClick" indicator
		circular  
		previousMargin="30"
		nextMargin="30"
		circular
		:autoplay="false"
		radius="5"
		bgColor="#ffffff"></u-swiper>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				swiperList: [
					{url:require('@/static/image/1.jpg')},
					{url:require('@/static/image/2.jpg')},
					{url:require('@/static/image/3.jpg')},
				],
			}
		},
		methods: {
			// 轮播图change事件
			swiperChange(){},
		}
	}
</script>

<style lang="scss" scoped>
	
</style>