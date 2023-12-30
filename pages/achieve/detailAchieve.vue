<template>
	<!-- 明细成绩 -->
	<view class="content">
		<NoticeBar ref="noticeRef"/>
		<menuBar />
		<u-swiper />
		<view>
			<view class="" style="margin-top: 10px;">
				<u-datetime-picker :show="pickerShow" v-model="valueTime" mode="date" @confirm="getDate"
					@cancel="pickerClose" closeOnClickOverlay>
				</u-datetime-picker>
				<view class="time-component" style="display: flex;">
					<p style="position: relative;top: 6px;width: 100px">查询时间：</p>
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
							<u-input placeholder="请输入" v-model="searchForm.valueData">
							<!-- #endif -->
								<!-- #ifdef APP-NVUE -->
								<u--input placeholder="请输入">
								<!-- #endif -->
									<template slot="suffix">
										<!-- @tap 手指触摸离开时触发 -->
										<u-button @tap="getDetailAchieve" type="primary" size="mini">查询</u-button>
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
			<view class="detail-table">
				<!-- 表格 特殊表格，采用原生方式处理 -->
				<view class="wrap">
					<view class="">
						<!-- 无数据时 -->
						<view style="margin-top: 15px;" class="" v-if="!tableTitle || tableTitle.length===0">
							<u-empty
							        mode="data"
							        icon="../../static/icon/no-data-img.png"
							>
							</u-empty>
						</view>
						<table class="table table_wrap" v-if="tableTitle && tableTitle.length>0">
							<thead> <!-- thead标签在这里已经不代表表头了-->
								<tr>  <!-- 每个tr标签的第一个td标签为表头-->
									<td class="table_content" v-for="(item,i) in tableTitle" :key="i" :class="i===0 ? 'table_title' : ''">
										<p>{{ item }}</p>
									</td>
								</tr>
							</thead>
							<tbody>
								<tr class="table_tr">
									<td class="table_content" v-for="(val,i) in tableValue" :key="i" :class="i===0 ? 'table_title' : ''">
										<p>{{ val }}</p>
									</td>
								</tr>
							</tbody>
						</table>
					</view>
				</view>
			</view>
			<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 14px;">
				<view class="claim-content-top">
					<view class="claim-content-top-left" style="width: 30%;">
						<span style="color: #d9001B">{{ item.nickName }}</span>
					</view>
					<view class="" style="width: 30%;">
						{{ item.anLabel }} {{ item.an }}
					</view>
					<view class="claim-content-top-right" style="width: 40%;">
						<span>{{ item.cnLabel }} {{ item.cn }}</span>
					</view>
				</view>
				<view class="claim-content-bottom">
					<view class="left-range" style="width: 50%;">
						{{ item.tcsLabel }} {{ item.tcs }}
					</view>
					<view class="left-range" style="width: 96%;">
						{{ item.tbsLabel }} {{ item.tbs }}
					</view>
					<view class="left-range">
						<u-button type="primary" @click="openDeatilAchieve(item)" text="详情" size="mini"></u-button>
					</view>
				</view>
			</view>
		</view>
		<view class="" @touchmove.stop.prevent="stopPenetrate">
			<u-popup customStyle="padding:40px 5px 0 5px" :show="showModalDetailAchieve" mode="bottom" :round="12" @close="closePopupDetailAchieve" closeable closeOnClickOverlay safeAreaInsetBottom>
				<view style="height: calc(100vh - 200px);">
					<view class="u-pop-box">
						<view class="pop-box-name">
							用户: {{ detailAchieveInfo.nickName }}
						</view>
						<!-- 总成绩 总hejin -->
						<view class="achieve-box">
							<view class="">
								{{ detailAchieveInfo.tcsLabel }} {{ detailAchieveInfo.tcs }}
							</view>
							<view class="achieve-box-last">
								{{ detailAchieveInfo.tbsLabel }} {{ detailAchieveInfo.tbs }}
							</view>
						</view>
						
						<view class="achieve-label">
							<view class="">
								<view class="">
									{{ detailAchieveInfo.cnLabel }} {{ detailAchieveInfo.cn }}
								</view>
								<view class="">
									{{ detailAchieveInfo.anLabel }} {{ detailAchieveInfo.an }}
								</view>
							</view>
						</view>
						
						<!-- 列表 -->
						<view class="info-table-detail" v-if="detailAchieveInfo.tableItemVoList && detailAchieveInfo.tableItemVoList.length>0">
							<view class="table_wrap" v-for="(item, index) in detailAchieveInfo.tableItemVoList" :key="index">
								<view class="table-time">
									{{ item.dailyDate }}
								</view>
								<view class="detail-table">
									<view class="table_wrap">
										<table class="table">
											<thead> <!-- thead标签在这里已经不代表表头了-->
												<tr>  <!-- 每个tr标签的第一个td标签为表头-->
													<td class="table_content" v-for="(val,i) in item.tableTitle" :key="i">
														<p>{{ val }}</p>
													</td>
												</tr>
											</thead>
											<tbody>
												<tr class="table_tr">
													<td class="table_content" v-for="(tem,i) in item.tableValue" :key="i">
														<p>{{ tem }}</p>
													</td>
												</tr>
											</tbody>
										</table>
									</view>
								</view>
								<view style="display: flex;justify-content: center;">
									显示近7天数据
								</view>
							</view>
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
				inputType: "start",
				selectType: "",
				searchForm:{
					uid:"", // id
					nk:"",  // 昵称
					cn:"",  // 备注
					an:"",  // 所属
					valueData:"",
					page: 1,
					limit: 20,
					dailyDate: "",
				},
				datalist: [],
				tableTitle: [],
				tableValue: [],
				showModalDetailAchieve: false,
				detailAchieveInfo: {},
				indexList: [],
				
				chosetype: 1,
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
				timer: null,
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
			// 下拉选择框事件
			changeStudentSelect(e){
				if(!e){
					this.searchForm.valueData = "";
				}
				this.selectType = e;
			},
			// 获取学生成绩
			getDetailAchieve(type){
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
				uni.$u.http.post('/app/api/score/items', params).then(res => {
					if(res.code == 0){
						this.total = res.data.count;
						// 上表表头
						this.tableTitle = res.data.tableTitle;
						this.tableValue = res.data.tableValue;
						// 上表内容
						if(type && type==="more"){
							res.data.detailItemVoList.forEach(item=>{
								this.indexList.push(item)
							})
						}else{
							this.indexList = res.data.detailItemVoList;
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
				this.getDetailAchieve();
			}, 
			
			// 打开详情
			openDeatilAchieve(item){
				this.showModalDetailAchieve = true;
				this.detailAchieveInfo = item;
			},
			// 关闭弹出层
			closePopupDetailAchieve(){
				this.showModalDetailAchieve = false;
			},
			// 防止弹出层滑动
			stopPenetrate(){
				return;
			},
			// 调用消息组件中的方法
			getNoticeData(){
				this.$refs.noticeRef.getMsgNumber();
			}
		},
		mounted() {
			// 循环消息事件
			let that = this;
			that.getNoticeData();
			console.log("that.$refs.noticeRef",that.$refs.noticeRef)
			that.timer = setInterval( () => { 
				that.getNoticeData();
			}, 5000);	
		},
		created() {
			this.getDetailAchieve();
		},
		onHide() {
			if(this.timer){
				clearInterval(this.timer);
			}
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
	.detail-table{
		margin: 10px 0;
		.wrap {
			/* 这个只是用来居中内容 */
			align-items: center;
			// display: flex;
			height: 100%;
			justify-content: center;
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
		}
		
		.table_title {
			padding: 10px;
			left: 0px;
			position: sticky; // 表头还是靠粘性固定
			font-weight: bold;
			text-align: center;
			border-right: 1px solid rgb(232, 232, 232);
		}
		
		.table_title p,  .table_content p{
			// width: 60px;
			font-size: 12px;
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
	.u-pop-box{
		.pop-box-name{
			font-size: 22px;
			font-weight: bold;
			color: #000;
			text-align: center;
		}
		.achieve-box{
			display: flex;
			justify-content: center;
			margin-top: 10px;
			.achieve-box-last{
				margin-left: 30px;
			}
		}
		.achieve-label{
			display: flex;
			justify-content: center;
			margin-top: 5px;
			line-height: 25px;
		}
		.info-table-detail{
			margin-top: 10px;
			.table-time{
				font-weight: bold;
				font-size: 18px;
				display: flex;
				justify-content: center;
			}
		}
	}
</style>