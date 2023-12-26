<template>
	<!-- 组件: 顶部菜单及下拉dropdownment -->
	<view class="sub-section">
		<!-- titleArr: 选择项数组 dropArr: 下拉项数组 二维数组 @finishDropClick: 下拉筛选完成事件-->
		<cc-dropDownMenu v-if="flag" :titleArr="titleArr" :dropArr="dropArr" @finishDropClick="finishClick"></cc-dropDownMenu> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleArr:[],   // 四个menu大项
				dropArr:[],    // menu下拉内容
				flag: false,
				filterResultData: [],
				curNow: 0,
				showOverlay: false
			};
		},
		computed: {
			index(){
				return this.$store.state.tabbarIndex;
			}
		},
		methods: {
			// 轮播图点击事件
			swiperClick(){},
			sectionChange(index) {
				this.curNow = index;
				
			},
			finishClick(resultData) {
				// 两次循环 筛选出当前点击菜单，跳转到点击菜单的url
				for(let i=0;i<this.dropArr.length;i++){
					for(let n=0;n<this.dropArr[i].length;n++){
						if(this.dropArr[i][n].value == resultData){
							uni.navigateTo({
								url: this.dropArr[i][n].url
							})
						}
					}
				}
			},
			// 初始化接口
			init() {
				let params = {
					_tk:uni.getStorageSync("wp_token")
				}
				uni.$u.http.post('/app/api/main/init', params).then(res => {
					if(res.code == 0){
						let titleList = [];
						res.data.headerMenus.forEach(item=>{
							this.titleArr.push(item.title);
							titleList.push(item.menus);
						})
						for(let i=0;i< titleList.length;i++){
							let newList = titleList[i].map(item => { return { text: item.title, value:item.orderNum, url:item.url} });
							this.dropArr.push(newList);
						}
						this.flag = true;
					}
				}).catch((err) =>{
					console.log("err",err)
				})
			},
		},
		created() {
			this.init();
		}
	}
</script>

<style lang="scss" scoped>
	.bar_img{
		width: 46rpx;
		height: 46rpx;
	}
	.sub-section{
		margin-bottom: 5px;
	}
	.drop-down-menu{
		background: #fff;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>