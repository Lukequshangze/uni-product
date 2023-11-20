<template>
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
			
			<view class="">
				<!-- 下拉选组件  select-lay@1.3.8 -->
				<select-lay :zindex="1211" :value="tval" name="name" placeholder="请选择项目" :options="datalist"
					@selectitem="selectitem">
				</select-lay>
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
				tval: "",
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
					label: "label1",
					value: "value1"
				},
				{
					label: "label2",
					value: "value2"
				},
				{
					label: "label3",
					value: "value3"
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
			selectitem(index, item) {
				console.log(item)
				if (index >= 0) {
					this.tval = item.value;
				} else {
					this.tval = ""
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
</style>