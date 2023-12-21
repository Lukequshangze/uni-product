<template>
	<!-- 课程管理 -->
	<view class="content">
		<NoticeBar />
		<menuBar />
		<u-swiper />
		<view>
			<view class="" style="margin-top: 12px;">
				<u-datetime-picker :show="pickerShow" v-model="valueTime" mode="date" @confirm="getDate"
					@cancel="pickerClose" closeOnClickOverlay>
				</u-datetime-picker>
				<view class="" style="display: flex;">
					<p style="position: relative;top: 6px;">查询时间：</p>
					<u--input shape="circle" placeholder="选择时间" border="surround" v-model="searchForm.dailyDate"
						@focus="selectStartTime"></u--input>
				</view>
				<view class="" style="display: flex;margin-top: 10px;">
					<text style="position: relative;top: 5px;margin-right: 10px;">分组名: </text>
					<u-input placeholder="请输入分组名" v-model="searchForm.gn"></u-input>
				</view>
				<view class="query-content">
					<view class="query-content-select">
						<uni-data-select v-model="chosetype" :localdata="studentSelect"></uni-data-select>
					</view>
					<view class="query-content-input">
						<view class="u-demo-block__content">
							<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
							<!-- #ifndef APP-NVUE -->
							<u-input placeholder="请输入" v-model="searchForm.valueData">
							<!-- #endif -->
								<!-- #ifdef APP-NVUE -->
								<u--input placeholder="请输入">
								<!-- #endif -->
									<template slot="suffix">
										<!-- @tap 手指触摸离开时触发 -->
										<u-button @tap="getCourseManageList" :text="tips" type="primary"
											size="mini">查询</u-button>
									</template>
							<!-- #ifndef APP-NVUE -->
							</u-input>
							<!-- #endif -->
							<!-- #ifdef APP-NVUE -->
							</u--input>
							<!-- #endif -->
						</view>
					</view>
				</view>
			</view>
			<!-- 无数据时 -->
			<view style="margin-top: 15px;" class="" v-if="!indexList || indexList.length===0">
				<u-empty
				        mode="data"
				        icon="http://cdn.uviewui.com/uview/empty/data.png"
				>
				</u-empty>
			</view>
			<view class="" v-if="!indexList || indexList.length>0">
				<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 14px;">
					<view class="claim-content-bottom">
						<view class="left-range" style="width: 36%;">
							{{ item.sIdLabel }}{{ item.sId }}
						</view>
						<view class="left-range" style="width: 27%;">
							{{ item.anLabel }}{{ item.an }}
						</view>
						<view class="left-range" style="width: 27%;">
							{{ item.cnLabel }}{{ item.cn }}
						</view>
						<view class="left-range" style="width: 10%;">
							<u-button type="primary" @click="openDetailModal(item)" text="详情" size="mini"></u-button>
						</view>
					</view>
				</view>
			</view>
			<u-popup customStyle="padding:40px 5px 0 5px" :show="showModal" mode="bottom" :round="12" @close="closePopup" closeable closeOnClickOverlay safeAreaInsetBottom>
				<view style="height: calc(100vh - 200px);">
					<view class="u-pop-box">
						<view class="pop-box-name">
							{{ activeData.sIdLabel }}{{activeData.sId}}
						</view>
						<view>
							<view class="pop-box-settle">
								{{ activeData.cnLabel }}{{activeData.cn ? activeData.cn : '-'}}
							</view>
							<view class="pop-box-settle">
								{{ activeData.anLabel }}{{activeData.an}}
							</view>
						</view>
					
						<view class="search-table">
							<!-- 表格 -->
							<zb-table :show-header="true" :columns="column" :stripe="true" :fit="false"
								@toggleRowSelection="toggleRowSelection" @toggleAllSelection="toggleAllSelection" :border="true"
								@edit="buttonEdit" @dele="dele" :data="activeData.courseResultDetailVoList">
							</zb-table>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 底部导航栏组件 -->
		<customTabBar></customTabBar>
	</view>
</template>

<script>
	import customTabBar from "@/components/tabbar/tabbar.vue";
	import menuBar from "@/components/tabbar/menuBar.vue";
	import uSwiper from "@/components/tabbar/swiper.vue";
	import NoticeBar from "@/components/notify/notifyBar.vue";
	export default {
		data() {
			return {
				pickerShow: false,
				valueTime: Number(new Date()),
				startTime: "",
				endTime: "",
				inputType: "start",
				showModal: false,
				activeData: {},
				searchForm: {
					uid: "",
					nk: "",
					cn: "",
					an: "",
					page: 1,
					limit: 20,
					gn: "",
					valueData: "",
					dailyDate: "",
				},
				datalist: [],
				indexList: [],
				column:[
					{ name: 'course', label: '课程'},
					{ name: 'bs', label: '带入' },
					{ name: 'pbn', label: '手数' },
					{ name: 'cs', label: '成绩' },
				],
				
				chosetype: "",
				studentSelect: [{
						value: 0,
						text: "ID"
					},
					{
						value: 1,
						text: "名称"
					},
					{
						value: 2,
						text: "备注"
					},
					{
						value: 4,
						text: "所属"
					},
				],
			}
		},
		components: {
			customTabBar,
			NoticeBar,
			menuBar,
			uSwiper,
		},
		onLoad() {

		},
		onShow() {
			this.$store.commit("changeTabbarIndex", 0);
			this.datalist = [{
					text: "名称",
					value: "0"
				},
				{
					text: "ID",
					value: "1"
				},
				{
					text: "备注",
					value: "2"
				},
				{
					text: "所属",
					value: "3"
				}
			];
		},
		methods: {
			// 关闭时间选择弹窗
			pickerClose() {
				this.pickerShow = false;
			},
			
			// 触发
			selectStartTime(){
				this.pickerShow = true; 
			},
			
			// picher确认事件
			getDate(e){
				this.pickerShow = false; 
				let date = new Date(e.value);
				this.searchForm.dailyDate = this.dateFormatter(
					"yyyy-MM-dd",
					date
				);
			}, 
			// 打开弹出层
			openDetailModal(item){
				this.showModal = true;
				this.activeData = item;
			},
			// 关闭弹出层
			closePopup(){
				this.showModal = false;
			},
			// 获取老师管理信息
			getCourseManageList(type){
				if(this.chosetype === 0){
					this.searchForm.uid = Number(this.searchForm.valueData);
					this.searchForm.nk = "";
					this.searchForm.cn = "";
					this.searchForm.an = "";
				}else if(this.chosetype === 1){
					this.searchForm.nk = this.searchForm.valueData;
					this.searchForm.uid = "";
					this.searchForm.cn = "";
					this.searchForm.an = "";
				}else if(this.chosetype === 2){
					this.searchForm.cn = this.searchForm.valueData;
					this.searchForm.uid = "";
					this.searchForm.an = "";
					this.searchForm.nk = "";
				}else if(this.chosetype === 3){
					this.searchForm.an = this.searchForm.valueData;
					this.searchForm.uid = "";
					this.searchForm.nk = "";
					this.searchForm.cn = "";
				}
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					nk: this.searchForm.nk,
					an: this.searchForm.an,         // 所属
					cn: this.searchForm.cn,         // 所属
					uid: this.searchForm.uid,
					gn: this.searchForm.gn,         // 分组名
					page: this.searchForm.page,
					limit: this.searchForm.limit,   // 默认 20
					start: "",
					dailyDate: this.searchForm.dailyDate,
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.$u.http.post('/app/api/sys/courselist', params).then(res => {
					if(res.code == 0){
						this.total = res.data.count;
						if(type && type==="more"){
							res.data.itemVoList.forEach(item=>{
								this.indexList.push(item)
							})
						}else{
							this.indexList = res.data.itemVoList;
						}
						uni.hideLoading();
					}else{
						this.$api.msg("加载失败");
					}
				}).catch((err) =>{
					//隐藏加载框
					uni.hideLoading();
				})
			},
			async onReachBottom() {
				if(this.total > this.searchForm.page * this.searchForm.limit){
					this.searchForm.page += 1;
					this.getCourseManageList("more");
				}else{
					this.$api.msg("已加载全部数据");
				}
			},

		},
		created() {
			this.getCourseManageList();
		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		display: flex;
		margin-top: 10px;

		.time-line {
			position: relative;
			top: 8px;
			margin: 0 10px;
		}
	}

	.text {
		font-size: 12px;
		color: #666;
		margin-top: 5px;
	}

	.uni-px-5 {
		padding-left: 10px;
		padding-right: 10px;
	}

	.uni-pb-5 {
		padding-bottom: 10px;
	}

	.query-content {
		display: flex;
		margin-top: 10px;

		.query-content-select {
			width: 29%;
		}

		.query-content-input {
			margin-left: 1%;
			width: 69%;
		}
	}
	::v-deep {

		.u-input--radius,
		.u-input--square {
			padding: 4px 9px !important;
		}
	}
	.claim-content{
		background: #f2f2f2;
		margin-top: 5px;
		padding: 5px 8px;
		line-height: 26px;
		.claim-content-top{
			display: flex;
			justify-content: space-between;
			.claim-content-top-left{
				// width: 60%;
			}
			.claim-content-top-right{
				// width: 40%;
				padding-right: 10px;
			}
		}
		.claim-content-bottom{
			display: flex;
			justify-content: space-between;
			padding-right: 10px;
		}
		.left-range{
			
		}
	}
	.u-pop-box{
		.pop-box-name{
			font-size: 22px;
			font-weight: bold;
			color: #000;
			text-align: center;
		}
		.pop-box-settle{
			display: flex;
			justify-content: center;
			line-height: 28px;
			.wrap {
				/* 这个只是用来居中内容 */
				height: 100%;
				width: 44%;
				margin: 20px 3% 0 3%;
				.wrap-text{
					display: flex;
					justify-content: center;
					margin-bottom: 10px;
				}
			}
			
			table thead th{
				font-size: 400;
			}
			
			.table_wrap {
				border: 1px solid rgb(232, 232, 232);
				overflow: auto;
				width: 100%;
			}
			
			.table {
				border-collapse: collapse;
				width: 100%;
				text-align: center;
			}
			
			.table_content {
				padding: 10px;
			}
			.table_content:not(:last-child){
				border-right: 1px solid rgb(232, 232, 232);
			}
			
			.table_tr{
				border-top: 1px solid rgb(232, 232, 232);
			}
		}
		.search-table {
			margin: 20px 0;
			.select-com {
				width: 30%;
			}
		}
	}
</style>