<template>
	<!-- 学生成绩 -->
	<view class="content">
		<NoticeBar />
		<menuBar />
		<u-swiper />
		<view class="search-box time-component">
			<u-datetime-picker :show="pickerShow" v-model="valueTime" mode="date" @confirm="getDate"
				@cancel="pickerClose" closeOnClickOverlay>
			</u-datetime-picker>
			<view class="" style="display: flex;">
				<p style="position: relative;top: 6px;width: 100px">查询时间：</p>
				<!-- <u--input shape="circle" placeholder="选择时间" border="surround" v-model="searchForm.dailyDate"
					@focus="selectStartTime"></u--input> -->
				<view class="time-component-input-all" @click="selectStartTime">
					{{ searchForm.dailyDate ? searchForm.dailyDate : "请选择时间" }}
				</view>
			</view>
			<view class="query-content">
				<view class="query-content-select">
					<uni-data-select v-model="chosetype" :localdata="studentSelect"
						@change="changeStudentSelect"></uni-data-select>
				</view>
				<view class="query-content-input">
					<view class="u-demo-block__content">
						<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
						<!-- #ifndef APP-NVUE -->
						<u-input placeholder="请输入" v-model="searchForm.valueData" style="padding: 4px 9px;">
						<!-- #endif -->
							<!-- #ifdef APP-NVUE -->
							<u--input placeholder="请输入">
							<!-- #endif -->
								<template slot="suffix">
									<!-- @tap 手指触摸离开时触发 -->
									<u-button @tap="getStudentAchieve" type="primary" size="mini">查询</u-button>
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
		<view style="margin-top: 15px;" class="" v-if="indexList && indexList.length===0">
			<u-empty
			        mode="data"
			        icon="../../static/icon/no-data-img.png"
			>
			</u-empty>
		</view>
		<view class="" v-if="indexList && indexList.length>0">
			<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 14px;">
				<view class="claim-content-top">
					<view class="claim-content-top-left">
						<span style="color: #d9001B">{{ item.nickname }}</span>
					</view>
					<view class="claim-content-top-right">
						<span>{{ item.daily }}</span>
					</view>
				</view>
				<view class="claim-content-bottom">
					<view class="">
						{{ item.drtotalscoreLabel }}{{ item.drtotalscore }}
					</view>
					<view class="left-range">
						{{ item.sumhandnumLabel }}{{ item.sumhandnum }}
					</view>
					<view class="left-range">  
						{{ item.totalscoreLabel }}{{ item.totalscore }}
					</view>
					<view class="left-range">
						{{ item.agentnameLabel }}{{ item.agentname }}
					</view>
					<view class="left-range">
						<u-button type="primary" text="详情" size="mini" @click="openDetailModal(item.detailVo)"></u-button>
					</view>
				</view>
			</view>
		</view>
		<view class="" @touchmove.stop.prevent="stopPenetrate">
			<u-popup customStyle="padding:40px 5px 0 5px" :show="showModal" mode="bottom" :round="12" @close="closePopup" closeable closeOnClickOverlay safeAreaInsetBottom>
				<view style="height: calc(100vh - 200px);">
					<view class="u-pop-box">
						<view class="pop-box-name">
							{{ activeData.title }}
						</view>
						<view class="pop-box-settle">
							<!-- 未结场 -->
							<view class="wrap">
								<text class="wrap-text">未结场</text>
								<view class="table_wrap">
									<table class="table">
										<thead> <!-- thead标签在这里已经不代表表头了-->
											<tr>  <!-- 每个tr标签的第一个td标签为表头-->
												<td class="table_content">
													<p>{{ activeData.drscoredoingLabel }}</p>
												</td>
												<td class="table_content">
													<p>{{ activeData.recorddoingLabel }}</p>
												</td>
											</tr>
										</thead>
										<tbody>
											<tr class="table_tr">
												<td class="table_content">
								                    <p>{{ activeData.drscoredoing }}</p>
												</td>
												<td class="table_content">
												    <p>{{ activeData.recorddoing }}</p>
												</td>
											</tr>
										</tbody>
									</table>
								</view>
							</view>
							
							<!-- 已结场 -->
							<view class="wrap">
								<text class="wrap-text">已结场</text>
								<view class="table_wrap">
									<table class="table">
										<thead> <!-- thead标签在这里已经不代表表头了-->
											<tr>  <!-- 每个tr标签的第一个td标签为表头-->
												<td class="table_content">
													<p>{{ activeData.drscoreoverLabel }}</p>
												</td>
												<td class="table_content">
													<p>{{ activeData.recordoverLabel }}</p>
												</td>
											</tr>
										</thead>
										<tbody>
											<tr class="table_tr">
												<td class="table_content">
													<p>{{ activeData.drscoreover }}</p>
												</td>
												<td class="table_content">
													<p>{{ activeData.recordover }}</p>
												</td>
											</tr>
										</tbody>
									</table>
								</view>
							</view>
						</view>
						<view class="search-table">
							<!-- 表格 -->
							<zb-table :show-header="true" :columns="column" :stripe="true" :fit="false"
								@toggleRowSelection="toggleRowSelection" @toggleAllSelection="toggleAllSelection" :border="true"
								@edit="buttonEdit" @dele="dele" :data="activeData.detailItemVoList">
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
				title: '首页',
				pickerShow: false,
				valueTime: Number(new Date()),
				count: 4,
				value: 2,
				total: 0,
				showModal: false,
				activeData: {},
				searchForm:{
					uid:"", // id
					nk:"",  // 昵称
					cn:"",  // 备注
					an:"",  // 所属
					valueData:"",
					page: 1,
					limit: 20,
					dailyDate: null,
				},
				indexList: [],
				chosetype: 1,
				selectType: "",
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
				column: [{
						name: 'daily',
						label: '日期',
						fixed: false,
						emptyString: '--'
					},
					{
						name: 'club',
						label: '班级',
						emptyString: '--'
					},
					{
						name: 'handsum',
						label: '手数',
					},
					{
						name: 'record',
						label: '成绩',
					},
				],
			}
		},
		components:{
			customTabBar,
			NoticeBar,
			menuBar,
			uSwiper,
		},
		onLoad() {
			
		},
		onShow() {
			this.$store.commit("changeTabbarIndex",0);
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
			
			// 下拉选择框事件
			changeStudentSelect(e){
				if(!e){
					this.searchForm.valueData = "";
				}
				this.selectType = e;
			},
			
			// 获取学生成绩   
			getStudentAchieve(type){
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
					uid: this.searchForm.uid,
					nk: this.searchForm.nk,
					cn: this.searchForm.cn,
					an: this.searchForm.an,
					page: this.searchForm.page,
					limit: this.searchForm.limit,    // 页码 默认20
					start: 0,
					dailyDate: this.searchForm.dailyDate,
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.$u.http.post('/app/api/st/record', params).then(res => {
					if(res.code == 0){
						this.total = res.data.count;
						if(type && type==="more"){
							res.data.dataList.forEach(item=>{
								this.indexList.push(item)
							})
						}else{
							this.indexList = res.data.dataList;
						}
						//隐藏加载框
						uni.hideLoading();
					}
				}).catch((err) =>{
					this.$api.msg("加载失败");
					//隐藏加载框
					uni.hideLoading();
				})
			},
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
			// 防止弹出层滑动
			stopPenetrate(){
				return;
			},
		},
		created() {
			this.getStudentAchieve();
		}
	}
</script>

<style lang="scss" scoped>
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
			margin-left:5px;
		}
	}
	.search-box{
		margin-top: 10px;
		.query-content{
			display: flex;
			margin-top: 10px;
			.query-content-select{
				width: 29%;
			}
			.query-content-input{
				margin-left: 1%;
				width: 69%;
			}
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