<template>
	<!-- 学生管理 -->
	<view class="content">
		<NoticeBar />
		<menuBar />
		<u-swiper />
		<view>
			<view class="">
				<!-- <u-datetime-picker :show="pickerShow" v-model="valueTime" mode="date" @confirm="getDate"
					@close="pickerClose" @change="changeStartTime"></u-datetime-picker>
				<view class="search-box">
					<u--input shape="circle" placeholder="起始时间" border="surround" v-model="startTime"
						@focus="selectStartTime"></u--input>
					<span class="time-line"> - </span>
					<u--input shape="circle" placeholder="结束时间" border="surround" v-model="endTime"
						@focus="selectEndTime"></u--input>
				</view> -->
				<view class="group-search">
					<span class="search-gn">分组名: </span>
					<u--input class="gn-ipt" placeholder="请输入分组名称" border="surround" v-model="searchForm.gn"></u--input>
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
										<u-button @tap="getStudentManage" type="primary"
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
			<view style="margin-top: 15px;" class="" v-if="indexList && indexList.length===0">
				<u-empty
				        mode="data"
				        icon="http://cdn.uviewui.com/uview/empty/data.png"
				>
				</u-empty>
			</view>
			<view class="" v-if="indexList && indexList.length>0">
				<view class="claim-content" v-for="(item, index) in indexList" :key="index" style="font-size: 14px;">
					<view class="">
						<uni-row class="demo-uni-row">
							<uni-col :span="6">
								<view class="demo-uni-col dark" style="font-size: 10px;color: #d9001b;">
									{{ item.studentIdLabel }}: {{ item.studentId }}
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col light">
									{{ item.creditScoreLabel }}: {{ item.creditScore }}
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col dark">
									{{ item.isBlackLabel }}: {{ item.isBlack }}
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col light" style="display: flex;">
									<u-button type="primary" @click="openModelReserveAchieve(item)" text="额备" size="mini"></u-button>
									<u-button type="primary" @click="openModelGroupStudent(item)" v-if="item.isInGroup === 0" text="分组" size="mini" style="margin-left: 2px;"></u-button>
									<u-button type="primary" @click="openModelSecureStudent(item)" v-if="item.isInGroup === 1" text="解组" size="mini" style="margin-left: 2px;"></u-button>
								</view>
							</uni-col>
						</uni-row>
						
						<uni-row class="demo-uni-row">
							<uni-col :span="6">
								<view class="demo-uni-col dark">
									{{ item.nickName }}
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col light">
									{{ item.reCreditLabel }}: {{ item.reCredit }}
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col dark">
									{{ item.cnLabel }}: <span style="font-size: 10px;">{{ item.cn }}</span>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col light" style="display: flex;">
									<u-button type="primary" @click="openModelRechargeStudent(item)" text="充" size="mini"></u-button>
									<u-button type="primary" @click="openModelSettleStudent(item)" text="结" size="mini" style="margin-left: 2px;"></u-button>
								</view>
							</uni-col>
						</uni-row>
						
						<uni-row class="demo-uni-row">
							<uni-col :span="18">
								<view class="demo-uni-col dark">
									{{ item.groupLabel }} :{{ item.group ? item.group : ' 无' }}
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="demo-uni-col light" style="display: flex;">
									<u-button type="primary" @click="openRemoveBtn(item)" text="移除" size="mini">
									</u-button>
									<u-button type="primary" @click="openBlockBtn(item)" text="拉黑" size="mini" style="margin-left: 2px;">
									</u-button>
								</view>
							</uni-col>
						</uni-row>
					</view>
					<view class=""></view>
					<view class=""></view>
				</view>
			</view>
			<!-- 移除模态框 -->
			<u-modal :show="removeModel" :content='removeContent' @confirm="removeConfirm" @cancel="removeCancel" showCancelButton></u-modal>
			<!-- 拉黑模态框 -->
			<u-modal :show="blockModel" :content='blockContent' @confirm="blockConfirm" @cancel="blockCancel" showCancelButton></u-modal>
			<!-- 解除绑定分组 -->
			<u-modal :show="secureModel" :content='secureContent' @confirm="secureConfirm" @cancel="secureCancel" showCancelButton></u-modal>
			<!-- 额备弹出层 -->
			<u-popup customStyle="padding:40px 5px 0 5px" :show="showModalReserveAchieve" mode="bottom" :round="12" @close="closeModelReserveAchieve" closeable closeOnClickOverlay safeAreaInsetBottom>
				<view style="height: 60vh;">
					<u--form
							labelPosition="left"
							:model="reserveObj"
							ref="uForm"
							labelWidth="200rpx"
					>
					<u-form-item
							label="学生ID"
							ref="item1"
							borderBottom
					>
						<u--input
								v-model="reserveObj.studentId"
								border="none"
								disabled
						></u--input>
					</u-form-item>
					<u-form-item
							label="学生名称"
							ref="item1"
							borderBottom
					>
						<u--input
								v-model="reserveObj.nickName"
								border="none"
								disabled
						></u--input>
					</u-form-item>
						<u-form-item
								label="学生信额"
								ref="item1"
								borderBottom
						>
							<u--input
									v-model="reserveObj.creditScore"
									border="none"
							></u--input>
						</u-form-item>
						<u-form-item
								label="学生备注1"
								ref="item1"
								borderBottom
						>
							<u--input
									v-model="reserveObj.cn1"
									border="none"
							></u--input>
						</u-form-item>
						<u-form-item
								label="学生备注2"
								ref="item1"
								borderBottom
						>
							<u--input
									v-model="reserveObj.cn2"
									border="none"
							></u--input>
						</u-form-item>
					</u--form>
					<view class="" style="display: flex;justify-content: space-around;margin-top: 60rpx;">
						<u-button type="primary" text="确定" @click="submitReserveForm" style="width: 30%;"></u-button>
						<u-button type="info" text="取消" @click="closeModelReserveAchieve" style="width: 30%;"></u-button>
					</view>
				</view>
			</u-popup>
			
			<!-- 分组弹出层 -->
			<u-popup customStyle="padding:40px 5px 0 5px" :show="showModalGroupStudent" mode="bottom" :round="12" @close="closeModelGroupStudent" closeable closeOnClickOverlay safeAreaInsetBottom>
				<view style="height: 60vh;">
					<u--form
							labelPosition="left"
							:model="groupStudentObj"
							ref="uForm"
							labelWidth="200rpx"
					>
					<u-form-item
							label="学生ID"
							ref="item1"
							borderBottom
					>
						<u--input
								v-model="groupStudentObj.studentId"
								border="none"
								disabled
						></u--input>
					</u-form-item>
					<u-form-item
							label="学生名称"
							ref="item1"
							borderBottom
					>
						<u--input
								v-model="groupStudentObj.nickName"
								border="none"
								disabled
						></u--input>
					</u-form-item>
						<u-form-item
								label="选择分组"
								ref="item1"
								borderBottom
						>
							<view class="query-content-select" style="width: 100%;">
								<uni-data-select v-model="chosetypeGroup" :localdata="studentSelectGroupList"
									@change="changeStudentSelect"></uni-data-select>
							</view>
						</u-form-item>
					</u--form>
					<view class="" style="display: flex;justify-content: space-around;margin-top: 60rpx;">
						<u-button type="primary" text="确定" @click="submitGroupStudentForm" style="width: 30%;"></u-button>
						<u-button type="info" text="取消" @click="closeModelGroupStudent" style="width: 30%;"></u-button>
					</view>
				</view>
			</u-popup>
			
			<!-- 充值弹出层 -->
			<u-popup customStyle="padding:40px 5px 0 5px" :show="showModalRechargeStudent" mode="bottom" :round="12" @close="closeModelRechargeStudent" closeable closeOnClickOverlay safeAreaInsetBottom>
				<view style="height: 30vh;">
					<view class="recharge-title">
						正在为【{{ rechargeObj.nickName }}】充值
					</view>
					<u--form
							labelPosition="left"
							:model="rechargeObj"
							ref="uForm"
							labelWidth="200rpx"
					>
					<u-form-item
							label="追加充值额度:"
							ref="item1"
					>
						<u--input
								v-model="rechargeObj.rechargeNum"
						></u--input>
					</u-form-item>
					</u--form>
					<view class="" style="display: flex;justify-content: space-around;margin-top: 60rpx;">
						<u-button type="primary" text="确定" @click="submitRechargeForm" style="width: 30%;"></u-button>
						<u-button type="info" text="取消" @click="closeModelRechargeStudent" style="width: 30%;"></u-button>
					</view>
				</view>
			</u-popup>
			
			<!-- 结算弹出层 -->
			<u-popup customStyle="padding:40px 5px 0 5px" :show="showModalSettleStudent" mode="bottom" :round="12" @close="closeModelSettleStudent" closeable closeOnClickOverlay safeAreaInsetBottom>
				<view style="height: 30vh;">
					<view class="recharge-title">
						正在为【{{ settlementObj.nickName }}】结算
					</view>
					<u--form
							labelPosition="left"
							:model="settlementObj"
							ref="uForm"
							labelWidth="200rpx"
					>
					<u-form-item
							label="可结算额度"
							ref="item1"
					>
						<u--input
								v-model="settlementObj.reCredit"
								disabled
						></u--input>
					</u-form-item>
					<u-form-item
							label="结算额度:"
							ref="item1"
					>
						<u--input
								v-model="settlementObj.settlementNum"
						></u--input>
					</u-form-item>
					</u--form>
					<view class="" style="display: flex;justify-content: space-around;margin-top: 60rpx;">
						<u-button type="primary" text="确定" @click="submitSettleForm" style="width: 30%;"></u-button>
						<u-button type="info" text="取消" @click="closeModelSettleStudent" style="width: 30%;"></u-button>
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
				selectType: "",
				datalist: [],
				total: 0,
				searchForm:{
					uid:"", // id
					nk:"",  // 昵称
					cn:"",  // 备注
					an:"",  // 所属
					valueData:"",
					page: 1,
					limit: 20,
					gn:"",
				},
				indexList: [],
				removeContent:"确认移除此学生出班级？",
				blockContent:"确认拉黑此学生？",
				removeModel: false,
				blockModel: false,
				removeObjData: {},
				blockObjData: {},
				
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
				
				// 额备
				showModalReserveAchieve: false,
				reserveObj:{
					cn1: "",
					cn2: "",
				},
				
				// 分组
				showModalGroupStudent: false,
				groupStudentObj:{},
				chosetypeGroup: "",
				studentSelectGroupList:[],
				secureContent:"确认解除分组绑定？",
				
				// 解除绑定分组
				secureModel: false,
				secureObjData: {},
				
				// 充值
				showModalRechargeStudent: false,
				rechargeObj: {
					rechargeNum: "",
				},
				
				// 结算
				showModalSettleStudent: false,
				settlementObj:{
					settlementNum: "",
				},
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
			// 查询
			getStudentManage(type){
				if(this.selectType === 0){
					this.searchForm.uid = Number(this.searchForm.valueData);
					this.searchForm.nk = "";
					this.searchForm.cn = "";
					this.searchForm.an = "";
				}else if(this.selectType === 1){
					this.searchForm.nk = this.searchForm.valueData;
					this.searchForm.uid = "";
					this.searchForm.cn = "";
					this.searchForm.an = "";
				}else if(this.selectType === 2){
					this.searchForm.cn = this.searchForm.valueData;
					this.searchForm.uid = "";
					this.searchForm.an = "";
					this.searchForm.nk = "";
				}else if(this.selectType === 3){
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
					gn: this.searchForm.gn,   						 // 分组名
				}
				if(type != "update"){
					uni.showLoading({
						title: '加载中'
					});
				}
				console.log("uni.$u.http",uni.$u.http)
				// uni.$u.http.config.baseURL = "http://apptest.alianke.com:9092"
				uni.$u.http.post('/app/api/sys/studentlist', params).then(res => {
					if(res.code == 0){
						console.log("res",res)
						this.total = res.data.count;
						if(type && type==="more"){
							res.data.itemVoList.forEach(item=>{
								this.indexList.push(item)
							})
						}else{
							this.indexList = res.data.itemVoList;
						}
						//隐藏加载框
						uni.hideLoading();
					}
				}).catch((err) =>{
					console.log("err",err)
				})
			},
			async onReachBottom() {
				if(this.total > this.searchForm.page * this.searchForm.limit){
					this.searchForm.page += 1;
					this.getStudentManage("more");
				}else{
					this.$api.msg("已加载全部数据");
				}
			},
			
			// 移除
			openRemoveBtn(item){
				this.removeModel = true;
				// 存放将要删除的数据
				this.removeObjData = item;
			},
			// 确认移除
			removeConfirm(){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					studentId: this.removeObjData.studentId,
				}
				uni.$u.http.post('/app/api/sys/player/remove', params).then(res => {
					if(res.code == 0){
						this.getStudentManage("update");   // 刷新列表
						this.removeModel = false;  // 关闭model框
						setTimeout(()=>{
							this.$api.msg("移除成功");
						},200)
					}else{
						this.removeModel = false;
						this.$api.msg(res.msg);
					}
				}).catch((err) =>{
					console.log("err",err)
				})
			},
			// 移除-取消事件
			removeCancel(){
				this.removeModel = false;
			},
			
			// 拉黑
			openBlockBtn(item){
				if(item.isBlack && item.isBlack === "是"){
					this.$api.msg("当前学生已拉入黑名单");
				}else{
					this.blockModel = true;
					// 存放将要拉黑的数据
					this.blockObjData = item;
				}
			},
			// 确认拉黑
			blockConfirm(){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					studentId: this.blockObjData.studentId,
					isBlack: 0,
				}
				uni.$u.http.post('/app/api/sys/player/black/edit', params).then(res => {
					if(res.code == 0){
						this.getStudentManage("update");   // 刷新列表
						this.blockModel = false;  // 关闭model框
						setTimeout(()=>{
							this.$api.msg("当前学生已拉入黑名单");
						},200)
					}else{
						this.$api.msg(res.msg);
					}
				}).catch((err) =>{
					this.$api.msg(err);
				})
			},
			// 拉黑-取消事件
			blockCancel(){
				this.blockModel = false;
			},
			
			// 学生额备
			// 打开额备弹出层
			openModelReserveAchieve(item){
				this.showModalReserveAchieve = true;
				this.reserveObj = item;
				console.log("it",item)
			},
			// 关闭额备弹出层
			closeModelReserveAchieve(item){
				this.showModalReserveAchieve = false;
			},
			
			// 提交表单
			submitReserveForm(){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					studentId: this.reserveObj.studentId,
					nickName: this.reserveObj.nickName,
					cs: this.reserveObj.creditScore,   // 信额
					cn1: this.reserveObj.cn1,
					cn2: this.reserveObj.cn2,
				}
				if(!this.reserveObj.creditScore && this.reserveObj.creditScore !==0){
					this.$api.msg("请输入学生信额...");
				}else{
					uni.$u.http.post('/app/api/sys/player/edit', params).then(res => {
						if(res.code == 0){
							this.getStudentManage("update");   // 刷新列表
							this.showModalReserveAchieve = false;  // 关闭model框
							setTimeout(()=>{
								this.$api.msg("修改成功");
							},200)
						}else{
							this.$api.msg(res.msg);
							this.showModalReserveAchieve = false;
						}
					}).catch((err) =>{
						//隐藏加载框
						uni.hideLoading();
					})
				}
			},
			
			// 学生分组
			// 打开分组弹出层
			openModelGroupStudent(item){
				this.showModalGroupStudent = true;
				this.groupStudentObj = item;
				// 获取分组列表
				this.getGroupList();
				console.log("it",item)
			},
			
			getGroupList(){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
				}
				uni.$u.http.post('/app/api/sys/grouplist', params).then(res => {
					if(res.code == 0){
						this.total = res.data.count;
						let groupList = [];
						groupList = res.data.itemVoList;
						this.studentSelectGroupList = groupList.map(item => ({
							value: item.gId,
							text: item.gn
						}))
					}else{
						this.$api.msg(res.msg);
					}
				}).catch((err) =>{
					
				})
			},
			// 关闭分组弹出层
			closeModelGroupStudent(item){
				this.showModalGroupStudent = false;
			},
			
			
			// 提交表单
			submitGroupStudentForm(){
				let gNameStr = "";
				if(this.studentSelectGroupList && this.studentSelectGroupList.length>0){
					this.studentSelectGroupList.forEach(item=>{
						if(item.value === this.chosetypeGroup){
							gNameStr = item.text;
						}
					})
				}
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					studentId: this.groupStudentObj.studentId,
					gId: this.chosetypeGroup,
					gName: gNameStr,
				}
				if(!this.chosetypeGroup){
					this.$api.msg("请选择分组...");
				}else{
					uni.$u.http.post('/app/api/sys/player/group/edit', params).then(res => {
						if(res.code == 0){
							this.getStudentManage("update");   // 刷新列表
							this.showModalGroupStudent = false;  // 关闭model框
							setTimeout(()=>{
								this.$api.msg("修改成功");
							},200)
						}else{
							this.$api.msg(res.msg);
							this.showModalGroupStudent = false;
						}
					}).catch((err) =>{
						//隐藏加载框
						uni.hideLoading();
					})
				}
			},
			
			// 解除绑定分组
			openModelSecureStudent(item){
				this.secureModel = true;
				this.secureObjData = item;
			},
			// 确认解除绑定分组
			secureConfirm(){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					studentId: this.secureObjData.studentId,
					gId: this.secureObjData.gId,
					gName: this.secureObjData.gName,
				}
				uni.$u.http.post('/app/api/sys/player/group/unbind', params).then(res => {
					if(res.code == 0){
						this.getStudentManage("update");   // 刷新列表
						this.secureModel = false;  // 关闭model框
						setTimeout(()=>{
							this.$api.msg("解除绑定分组成功");
						},200)
					}else{
						this.secureModel = false;
						this.$api.msg(res.msg);
					}
				}).catch((err) =>{
					console.log("err",err)
				})
			},
			// 解除绑定分组-取消事件
			secureCancel(){
				this.secureModel = false;
			},
			
			// 学生 - 充
			// 打开充值弹出层
			openModelRechargeStudent(item){
				this.showModalRechargeStudent = true;
				this.rechargeObj = item;
				console.log("it",item)
			},
			// 关闭充值弹出层
			closeModelRechargeStudent(item){
				this.showModalRechargeStudent = false;
			},
			
			// 提交表单
			submitRechargeForm(){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					studentId: this.rechargeObj.studentId,
					sv: Number(this.rechargeObj.rechargeNum),    // 结算金额
				}
				if(!this.rechargeObj.rechargeNum && this.rechargeObj.rechargeNum !==0){
					this.$api.msg("请输入结算金额...");
				}else{
					uni.$u.http.post('/app/api/sys/player/rechange', params).then(res => {
						if(res.code == 0){
							this.getStudentManage("update");   // 刷新列表
							this.showModalRechargeStudent = false;  // 关闭model框
							setTimeout(()=>{
								this.$api.msg("充值成功");
							},200)
						}else{
							this.$api.msg(res.msg);
							this.showModalRechargeStudent = false;
						}
					}).catch((err) =>{
						//隐藏加载框
						uni.hideLoading();
					})
				}
			},
			// 学生 - 结
			// 打开结算弹出层
			openModelSettleStudent(item){
				this.showModalSettleStudent = true;
				this.settlementObj = item;
				console.log("it",item)
			},
			// 关闭结算弹出层
			closeModelSettleStudent(item){
				this.showModalSettleStudent = false;
			},
			
			// 提交表单
			submitSettleForm(){
				let params = {
					_tk: uni.getStorageSync("wp_token"),
					studentId: this.settlementObj.studentId,
					sv: Number(this.settlementObj.settlementNum),    // 结算金额
				}
				if(!this.settlementObj.settlementNum && this.settlementObj.settlementNum !==0){
					this.$api.msg("请输入结算金额...");
				}else{
					uni.$u.http.post('/app/api/sys/player/settlement', params).then(res => {
						if(res.code == 0){
							this.getStudentManage("update");   // 刷新列表
							this.showModalSettleStudent = false;  // 关闭model框
							setTimeout(()=>{
								this.$api.msg("结算成功");
							},200)
						}else{
							this.$api.msg(res.msg);
							this.showModalSettleStudent = false;
						}
					}).catch((err) =>{
						//隐藏加载框
						uni.hideLoading();
					})
				}
			},
		},
		created(){
			this.getStudentManage();
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
		font-size: 12px !important;
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
		::v-deep{
			.u-button--mini{
				min-width: 0 !important;
			}
		}
	}
	.group-search{
		display: flex;
		margin-top: 10px;
		.search-gn{
			position: relative;
			top: 6px;
			width: 80px;
		}
		.gn-ipt{
			width: calc( 100vh - 80px );
		}
	}
	.recharge-title{
		font-size: 32rpx;
		font-family: PingFang SC-Semibold, PingFang SC;
		font-weight: 600;
		color: #1A1D24;
		margin-bottom: 26rpx;
		margin-left: 12rpx;
	}
</style>