<template>
	<!-- 本人成绩 -->
	<view class="content">
		<NoticeBar />
		<menuBar />
		<u-swiper />
		<view>
			<view class="">
				<u-datetime-picker :show="pickerShow" v-model="valueTime" mode="date" @confirm="getDate"
					@cancel="pickerClose" @change="changeStartTime"></u-datetime-picker>
				<view class="search-box">
					<u--input shape="circle" placeholder="起始时间" border="surround" v-model="searchForm.startTime"
						@focus="selectStartTime"></u--input>
					<span class="time-line"> - </span>
					<u--input shape="circle" placeholder="结束时间" border="surround" v-model="searchForm.endTime"
						@focus="selectEndTime"></u--input>
				</view>
				<view class="search-cond">
					<span class="search-nk">昵 称: </span>
					  <view class="u-demo-block__content" style="width: calc(100% - 50px);">
						<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
						<!-- #ifndef APP-NVUE -->
						<u-input placeholder="请输入昵称" v-model="searchForm.mark">
						<!-- #endif -->
							<!-- #ifdef APP-NVUE -->
							<u--input placeholder="请输入昵称">
							<!-- #endif -->
								<template slot="suffix">
									<!-- @tap 手指触摸离开时触发 -->
									<u-button @tap="getSelfAchieveList" type="primary" size="mini">查询</u-button>
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
			
			<view style="margin-top: 15px;" class="" v-if="selfAchieveList && selfAchieveList.length===0">
				<u-empty
				        mode="data"
				        icon="http://cdn.uviewui.com/uview/empty/data.png"
				>
				</u-empty>
			</view>
			<view class="search-table" v-if="selfAchieveList && selfAchieveList.length>0">
				<!-- 表格 -->
				<view class="self-achieve" v-for="(item,i) in selfAchieveList" :key="i">
					<view class="achieve-date">
						{{ item.dailyDate }}
					</view>
					<zb-table :show-header="true" :columns="item.column" :stripe="true" :fit="false" @rowClick="rowClick"
						@toggleRowSelection="toggleRowSelection" @toggleAllSelection="toggleAllSelection" :border="true"
						@edit="buttonEdit" @dele="dele" :data="item.scoreItemVoList">
					</zb-table>
					<zb-table :show-header="true" :columns="item.columnChild" :stripe="true" :fit="false" @rowClick="rowClick"
						@toggleRowSelection="toggleRowSelection" @toggleAllSelection="toggleAllSelection" :border="true"
						@edit="buttonEdit" @dele="dele" :data="item.levelItemVoList" style="margin-top: 10px;">
					</zb-table>
				</view>
			</view>
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

				datalist: [],
				searchForm:{
					mark:"",  // 昵称
					dailyDate: null,
					startTime: "",
					endTime: "",
				},
				selfAchieveList:[
					{
						date:"",
						column: [],          //上表表头
						columnChild: [],     //下表表头
						data: [],            //上表数据
						dataChile: [],       //下表数据
					},
				],
				chosetype: 0,
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
			//  -------------------- 时间选择器 start --------------------
			// 获取选择时间的时间戳
			getDate(e) {
				// e.value为选中事件的时间戳   e.mode为事件格式
				console.log(e)
				if(this.inputType === "start"){
					let date = new Date(this.valueTime);
					if(!this.searchForm.startTime){
						this.searchForm.startTime = this.dateFormatter(
							"yyyy-MM-dd",
							date
						);
					}
				}else if(this.inputType === "end"){
					let date = new Date(this.valueTime);
					if(!this.searchForm.endTime){
						this.searchForm.endTime = this.dateFormatter(
							"yyyy-MM-dd",
							date
						);
					}
				}
				this.pickerClose();
			},
			// 关闭时间选择弹窗
			pickerClose() {
				this.pickerShow = false;
			},
			// 选择起始时间
			selectStartTime() {
				this.pickerShow = true;
				this.inputType = "start";
				
			},
			// 选择结束时间
			selectEndTime() {
				this.pickerShow = true;
				this.inputType = "end";
			},
			// 修改时间
			changeStartTime(e) {
				console.log("e", e)
				let date = new Date(e.value);
				if (this.inputType === "start") {
					this.searchForm.startTime = this.dateFormatter(
						"yyyy-MM-dd",
						date
					);
				} else if (this.inputType === "end") {
					this.searchForm.endTime = this.dateFormatter(
						"yyyy-MM-dd",
						date
					);
				}
			},
			//  -------------------- 时间选择器 end --------------------			
			// 获取个人成绩数据
			getSelfAchieveList(type){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					beginDate: this.searchForm.startTime,
					endDate: this.searchForm.endTime,
					mark: this.searchForm.mark,
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.$u.http.post('/app/api/score/perscore', params).then(res => {
					if(res.code == 0){
						console.log("res",res)
						// this.total = res.data.count;
						if(type && type==="more"){
							res.data.forEach(item=>{
								this.selfAchieveList.push(item)
							})
						}else{
							this.selfAchieveList = res.data;
						}
						
						// 处理上表数据
						let column = [];
						let obj = {};
						// 取出需要的key合并为数组  作为表头 ------------ start ------------
						for(let i=0;i<this.selfAchieveList.length;i++){
							for(let n=0;n<this.selfAchieveList[i].scoreItemVoList.length;n++){
								obj.scoreBackLabel = this.selfAchieveList[i].scoreItemVoList[n].scoreBackLabel;
								obj.totalBuyScoreLabel = this.selfAchieveList[i].scoreItemVoList[n].totalBuyScoreLabel;
								obj.yozishLabel = this.selfAchieveList[i].scoreItemVoList[n].yozishLabel;
								obj.rewardLabel = this.selfAchieveList[i].scoreItemVoList[n].rewardLabel;
								obj.netamountLabel = this.selfAchieveList[i].scoreItemVoList[n].netamountLabel;
								obj.teacLabel = this.selfAchieveList[i].scoreItemVoList[n].teacLabel;
							}
						}
						let keyList = Object.keys(obj);
						let valueList = Object.values(obj);
						
						let size=keyList.length;
						for(let i=0;i<size;i++){
						  let a={};
						  a.name=keyList[i];
						  a.label=valueList[i];
						  column.push(a);
						}
						// ------------ end ------------
						
						// 将表内容字段修改为和表头一样，对应数据
						column.forEach(item=>{
							if(item.name === "netamountLabel"){
								item.name = "netamount";
							}
							if(item.name === "rewardLabel"){
								item.name = "reward";
							}
							if(item.name === "scoreBackLabel"){
								item.name = "scoreBack";
							}
							if(item.name === "teacLabel"){
								item.name = "teac";
							}
							if(item.name === "totalBuyScoreLabel"){
								item.name = "totalBuyScore";
							}
							if(item.name === "yozishLabel"){
								item.name = "yozish";
							}
						})
						this.selfAchieveList.forEach(item=>{
							item.column = column;
						})
						
						// 处理下表数据
						let columnChild = [];
						let objChild = {};
						// 取出需要的key合并为数组  作为表头 ------------ start ------------
						for(let i=0;i<this.selfAchieveList.length;i++){
							for(let n=0;n<this.selfAchieveList[i].levelItemVoList.length;n++){
								objChild.levelLabel = this.selfAchieveList[i].levelItemVoList[n].levelLabel;
								objChild.totalBuyScoreLabel = this.selfAchieveList[i].levelItemVoList[n].totalBuyScoreLabel;
								objChild.totalPlayBoutNumLabel = this.selfAchieveList[i].levelItemVoList[n].totalPlayBoutNumLabel;
								objChild.perValueLabel = this.selfAchieveList[i].levelItemVoList[n].perValueLabel;
							}
						}
						let keyListChild = Object.keys(objChild);
						let valueListChild = Object.values(objChild);
						console.log("objChild",objChild)
						let sizeChild=keyListChild.length;
						for(let i=0;i<sizeChild;i++){
						  let a={};
						  a.name=keyListChild[i];
						  a.label=valueListChild[i];
						  columnChild.push(a);
						}
						// ------------ end ------------
						
						// 将表内容字段修改为和表头一样，对应数据
						columnChild.forEach(item=>{
							if(item.name === "levelLabel"){
								item.name = "level";
							}
							if(item.name === "perValueLabel"){
								item.name = "perValue";
							}
							if(item.name === "totalBuyScoreLabel"){
								item.name = "totalBuyScore";
							}
							if(item.name === "totalPlayBoutNumLabel"){
								item.name = "totalPlayBoutNum";
							}
						})
						this.selfAchieveList.forEach(item=>{
							item.columnChild = columnChild;
						})
						console.log("aaaaaaaaaaaaaa",this.selfAchieveList)
						//隐藏加载框
						uni.hideLoading();
					}
				}).catch((err) =>{
					this.$api.msg("加载失败");
					//隐藏加载框
					uni.hideLoading();
				})
			},
			async onReachBottom() {
				if(this.total > this.searchForm.page * this.searchForm.limit){
					this.searchForm.page += 1;
					this.getClaimList("more");
				}else{
					this.$api.msg("已加载全部数据");
				}
			},
		},
		created() {
			this.getSelfAchieveList();
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
	
	
	.search-table {
		margin: 10px 0;
		.self-achieve{
			background: #F2F2F2;
			padding: 5px;
			margin: 3px 0;
			.achieve-date{
				display: flex;
				justify-content: center;
				margin: 5px 0;
			}
		}
	}
	.search-cond{
		display: flex;
		margin-top: 10px;
		.search-nk{
			position: relative;
			top: 6px;
			margin-right: 15px;
			width: 50px;
		}
	}
</style>