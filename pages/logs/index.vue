<template>
	<!-- 班级日志 -->
	<view class="content">
		<NoticeBar ref="noticeRef"/>
		<menuBar />
		<u-swiper />
		<view>
			<view class="">
				<u-datetime-picker
					:show="pickerShow"
					v-model="valueTime"
					mode="date"
					@confirm="getDate"
					@cancel="pickerClose"
					@change="changeStartTime"
				></u-datetime-picker>
				<view class="search-box time-component">
					<view class="time-component-input" @click="selectStartTime">
						{{ searchForm.startTime ? searchForm.startTime : "请选择起始时间" }}
					</view>
					<span class="time-component-line"></span>
					<view class="time-component-input" @click="selectEndTime">
						{{ searchForm.endTime ? searchForm.endTime : "请选择结束时间" }}
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
										<u-button @tap="getClassLogs" type="primary" size="mini">查询</u-button>
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
			
			<view class="search-table">
				
				<!-- 表格 -->
				<zb-table
					:show-header="true"
					:columns="column"
					:stripe="true"
					:fit="false"
					style="font-size: 12px;"
					@rowClick="rowClick"
					@toggleRowSelection="toggleRowSelection"
					@toggleAllSelection="toggleAllSelection"
					:border="true"
					@edit="buttonEdit"
					@dele="dele"
					:data="data">
				</zb-table>
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
				inputType: "start",
				searchForm:{
					uid:"", // id
					nk:"",  // 昵称
					cn:"",  // 备注
					an:"",  // 所属
					valueData:"",
					page: 1,
					limit: 20,
					startTime: "",
					endTime: "",
				},
				
				chosetype: 1,
				datalist: [],
				total: 0,
				
				column:[
				  { name: 'dailyDate', label: '时间',fixed:false,emptyString:'--' },
				  { name: 'nickname', label: '名称',emptyString:'--'},
				  { name: 'logInfo', label: '内容'},
				  { name: 'status', label: '状态'},
				],
				data:[
				  {
					result: '670',
					name: 'AA如影随形',
					number:'300',
					address:'be-ch',
				  }
				],
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
		components:{
			customTabBar,
			NoticeBar,
			menuBar,
			uSwiper,
		},
		onLoad() {
			
		},
		onShow() {
			this.$store.commit("changeTabbarIndex",1);
			this.datalist = [
				{
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
			// 获取token
			console.log("token===",uni.getStorageSync("wp_token"));
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
			
			// 下拉选择框事件
			changeStudentSelect(e){
				if(!e){
					this.searchForm.valueData = "";
				}
				this.selectType = e;
			},
			
			// 获取班级日志
			getClassLogs(type){
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
					beginDate: this.searchForm.startTime,
					endDate: this.searchForm.endTime,
					businessType: "",   // 查询的结束时间 YYYY-MM-DD hh:mm:ss
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.$u.http.post('/app/api/class/log', params).then(res => {
					if(res.code == 0){
						//隐藏加载框
						uni.hideLoading();
						console.log("res",res)
						this.total = res.data.count;
						if(type && type==="more"){
							res.data.dataList.forEach(item=>{
								this.data.push(item)
							})
						}else{
							this.data = res.data.dataList;
						}
					}
				}).catch((err) =>{
					console.log("err",err)
				})
			},
			async onReachBottom() {
				if(this.total > this.searchForm.page * this.searchForm.limit){
					this.searchForm.page += 1;
					this.getStudentList("more");
				}else{
					this.$api.msg("已加载全部数据");
				}
			},
			// 调用消息组件中的方法
			getNoticeData(){
				this.$refs.noticeRef.getMsgNumber();
			}
		},
		mounted(){
			this.getClassLogs();
			// 循环消息事件
			let that = this;
			that.getNoticeData();
			console.log("that.$refs.noticeRef",that.$refs.noticeRef)
			that.timer = setInterval( () => { 
				that.getNoticeData();
			}, 5000);
		},
		onHide() {
			if(this.timer){
				clearInterval(this.timer);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-box{
		display: flex;
		margin-top: 10px;
		.time-line{
			position: relative;
			top: 8px;
			margin: 0 10px;
		}
	}
	.search-table{
		margin: 10px 0;
		.select-com{
			width: 30%;
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
</style>