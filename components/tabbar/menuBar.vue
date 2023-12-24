<template>
	<!-- 组件: 顶部菜单及下拉dropdownment -->
	<view class="sub-section">
	   <!-- <u-subsection :list="list" :current="curNow" @change="sectionChange" mode="subsection"></u-subsection>
		<view class="drop-down-menu" v-if="">
			<view class="" v-for="(item, index) in menuChildList" :key="index">
				<view class="">
					{{ item.name }}
				</view>
			</view>
		</view>
		<u-overlay :show="showOverlay"></u-overlay> -->
		
		<!-- titleArr: 选择项数组 dropArr: 下拉项数组 二维数组 @finishDropClick: 下拉筛选完成事件-->
		<cc-dropDownMenu v-if="flag" :titleArr="titleArr1" :dropArr="dropArr1" @finishDropClick="finishClick"></cc-dropDownMenu> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleArr:[],
				dropArr:[],
				flag: false,
				
				titleArr1: ["学生","班级","成绩","管理"],
				dropArr1: [
					// 学生
					[
						{
                            text: '认领',
                            value: "101"
                        },
                        {
                            text: '带入',
                            value: 102
                        }, {
                            text: '学生汇总',
                            value: 103
                        },
                        {
                            text: "学生成绩",
                            value: "104"
                        }
                    ],
					// 班级
					[{
							text: '班级日志',
							value: "201"
						}, {
							text: '班级信息',
							value: "202"
						}
					],
					// 成绩
					[{
							text: '本人成绩',
							value: "301"
						}, {
							text: '明细成绩',
							value: "302"
						},
						{
							text: '老师成绩',
							value: "303"
						},
						{
							text: '分组成绩',
							value: "304"
						}
					],
					// 管理
					[{
							text: '学生管理',
							value: "401"
						}, {
							text: '老师管理',
							value: "402"
						},
						{
							text: '课程管理',
							value: "403"
						},
						{
							text: '分组管理',
							value: "404"
						}
					]
				],
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
				console.log("103",resultData)
				if(resultData[0] === "101"){
					uni.navigateTo({
						url: "/pages/home/index"
					})
				}else if(resultData[0] === 102){
					uni.navigateTo({
						url: "/pages/home/bringContent"
					})
				}else if(resultData[0] === 103){
					uni.navigateTo({
						url: "/pages/home/studentSummary"
					})
				}else if(resultData[0] === "104"){
					uni.navigateTo({
						url: "/pages/home/studentAchievement"
					})
				}else if(resultData[0] === "201"){
					uni.navigateTo({
						url: "/pages/logs/index"
					})
				}else if(resultData[0] === "202"){
					uni.navigateTo({
						url: "/pages/logs/classInfomation"
					})
				}else if(resultData[0] === "301"){
					uni.navigateTo({
						url: "/pages/achieve/selfAchieve"
					})
				}else if(resultData[0] === "302"){
					uni.navigateTo({
						url: "/pages/achieve/detailAchieve"
					})
				}else if(resultData[0] === "303"){
					uni.navigateTo({
						url: "/pages/achieve/teacherAchieve"
					})
				}else if(resultData[0] === "304"){
					uni.navigateTo({
						url: "/pages/achieve/groupAchieve"
					})
				}else if(resultData[0] === "401"){
					uni.navigateTo({
						url: "/pages/manage/studentManagement"
					})
				}else if(resultData[0] === "402"){
					uni.navigateTo({
						url: "/pages/manage/teacherManagement"
					})
				}else if(resultData[0] === "403"){
					uni.navigateTo({
						url: "/pages/manage/courseManagement"
					})
				}else if(resultData[0] === "404"){
					uni.navigateTo({
						url: "/pages/manage/groupManagement"
					})
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
						console.log('aa',this.titleArr)
						console.log('bb',this.dropArr)
						console.log('cc',this.dropArr1)
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