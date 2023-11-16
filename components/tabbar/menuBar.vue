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
		<cc-dropDownMenu :titleArr="titleArr" :dropArr="dropArr" @finishDropClick="finishClick"></cc-dropDownMenu> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleArr: ["学生","班级","成绩","管理"],
				dropArr: [
					// 学生
					[
						{
                            text: '认领',
                            value: "440102"
                        },
                        {
                            text: '带入',
                            value: "440103"
                        }, {
                            text: '学生汇总',
                            value: "440104"
                        },
                        {
                            text: "学生成绩",
                            value: "440105"
                        }
                    ],
					// 班级
					[{
							text: '班级日志',
							value: ""
						}, {
							text: '班级信息',
							value: "10000"
						}
					],
					// 成绩
					[{
							text: '本人成绩',
							value: "01"
						}, {
							text: '明细成绩',
							value: "02"
						},
						{
							text: '老师成绩',
							value: "03"
						},
						{
							text: '分组成绩',
							value: "04"
						}
					],
					// 管理
					[{
							text: '学生管理',
							value: ""
						}, {
							text: '老师管理',
							value: "0-1000"
						},
						{
							text: '课程查询',
							value: "1000-1500"
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
				if(resultData[0] === "440103"){
					uni.switchTab({
						url: "/pages/bring/index"
					})
				}
			}
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