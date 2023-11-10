<template>
	<view class="content">
		<text class="title">{{title}}</text>
		<button @click="getData">获取接口数据</button>
		<button @click="login">denglu</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '首页'
			}
		},
		onLoad() {

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
			}
		}
	}
</script>

<style lang="scss">

</style>