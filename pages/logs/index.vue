<template>
	<!-- 班级日志 -->
	<view class="content">
		<NoticeBar />
		<menuBar />
		<u-swiper />
		<view>
			<view class="">
				<u-datetime-picker
					:show="pickerShow"
					v-model="valueTime"
					mode="date"
					@confirm="getDate"
					@close="pickerClose"
					@change="changeStartTime"
				></u-datetime-picker>
				<view class="search-box">
					  <u--input shape="circle" placeholder="起始时间" border="surround" v-model="startTime" @focus="selectStartTime"></u--input>
					  <span class="time-line"> - </span>
					  <u--input shape="circle" placeholder="结束时间" border="surround" v-model="endTime" @focus="selectEndTime"></u--input>
				</view>
			</view>
			
			<view class="search-table">
				
				<!-- 表格 -->
				<zb-table
					:show-header="true"
					:columns="column"
					:stripe="true"
					:fit="false"
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
				startTime: "",
				endTime: "",
				inputType: "start",
				
				datalist: [],
				
				column:[
				  { name: 'name', label: '名称',fixed:false,width:80,emptyString:'--' },
				  { name: 'address', label: '所属',sorter:true,width:80,emptyString:'--'},
				  { name: 'number', label: '人数',sorter:true},
				  { name: 'result', label: '成绩',sorter:true },
				],
				data:[
				  {
					result: '670',
					name: 'AA如影随形',
					number:'300',
					address:'be-ch',
				  },
				  {
					result: '671',
					name: '虎娃必胜',
					number:'301',
					address:'be-ch',
				  },
				  {
					result: '672',
					name: '王小虎3',
					number:'311',
					address:'be-ch',
				  },
				  {
					result: '673',
					name: '王小虎4',
					number:'321',
					address:'be-ch',
				  },
				  {
					result: '674',
					name: '王小虎5',
					number:'330',
					address:'be-ch',
				  }
				]  
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
		},
		methods: {
			// 获取选择时间的时间戳
			getDate(e){
				// e.value为选中事件的时间戳   e.mode为事件格式
				console.log(e)
				this.pickerClose();
			},
			// 关闭时间选择弹窗
			pickerClose(){
				this.pickerShow = false;
			},
			// 选择起始时间
			selectStartTime(){
				this.pickerShow = true;
				this.inputType = "start";
				let date = new Date(this.valueTime);
				this.startTime = this.dateFormatter(
				  "yyyy-MM-dd",
				  date
				);
			},
			// 选择结束时间
			selectEndTime(){
				this.pickerShow = true;
				this.inputType = "end";
				let date = new Date(this.valueTime);
				this.endTime = this.dateFormatter(
				  "yyyy-MM-dd",
				  date
				);
			},
			// 修改时间
			changeStartTime(e){
				console.log("e",e)
				let date = new Date(e.value);
				if(this.inputType === "start"){
					this.startTime = this.dateFormatter(
					  "yyyy-MM-dd",
					  date
					);
				}else if(this.inputType === "end"){
					this.endTime = this.dateFormatter(
					  "yyyy-MM-dd",
					  date
					);
				}
			},
			
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
</style>