<template>
	<view class="content">
		<view class="login-top">
			<view class="login-title">
				<view class="">
					<image src="../../static/icon/loginLogo.png" class="login-logo" alt="" />
				</view>
				<view class="">
					<span class="login-text-b">We</span>
					<span class="login-text-r">PoKer</span>
					<span class="login-text-b">VIP</span>
					<view class="login-text-com">
						.com
					</view>
				</view>
			</view>
			<u-line color="#2979ff" style="margin: 5px 0 0 15%;width: 70%;"></u-line>
		</view>
		<view class="login-middle">
			<view class="login-info">
				<u--input class="login-user-put" placeholder="请输入账号" prefixIcon="../../static/icon/login-user.png"
					prefixIconStyle="font-size: 22px;color: #909399" v-model="form.userName"></u--input>
				<u--input class="login-password-put" placeholder="请输入密码"
					prefixIcon="../../static/icon/login-password.png"
					prefixIconStyle="font-size: 22px;color: #909399" v-model="form.passWord"></u--input>
				<view class="login-code">
					<view class="code-key">
						验证码：
					</view>
					<u--input border="bottom" v-model="form.graphicVerifyCode" style="letter-spacing: 20px;"></u--input>
					<!-- <u-code-input v-model="form.graphicVerifyCode" mode="line" :space="1" :maxlength="4" hairline></u-code-input> -->
					<!-- 随机生成图形验证码并校验 -->
					<view class="code-img-wrapper" @click="updateImageCode">
						<canvas style="width:160rpx;height:86rpx;" canvas-id="canvas"></canvas>
					</view>
				</view>
			</view>
		</view>
		<view class="submit-btn">
			<u-button type="primary" :plain="true" text="登录" @click="submit" style="width:80%"></u-button>
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { Mcaptcha } from '@/utils/mcaptcha'
	export default {
		data() {
			return {
				form: {
					graphicVerifyCode: "",
					userName: "",
					passWord: "",
				}
			}
		},
		components: {

		},
		onShow() {
			// 登录页面禁止返回上一页，隐藏返回箭头
			// let a = document.getElementsByClassName('uni-page-head-hd')[0];
			// a.style.display = 'none';
		},
		onLoad() {

		},
		onReady() {
			console.log("this.mcaptcha",this.mcaptcha)
			this.mcaptcha = new Mcaptcha({
				el: 'canvas',
				width: 80,
				height: 35,
				createCodeImg: ""
			});
		},
		methods: {
			// 刷新验证码
			updateImageCode() {
				console.log("this.mcaptcha",this.mcaptcha)
				this.mcaptcha.refresh()
			},
			// 登录表单提交
			submit() {
				// 用户名、密码、验证码都输入
				if(this.form.userName && this.form.passWord && this.form.graphicVerifyCode){
					let validate = this.mcaptcha.validate(this.form.graphicVerifyCode)
					console.log("this.form.graphicVerifyCode",this.form.graphicVerifyCode)
					console.log("validate",validate)
					if (!validate) {
						this.$refs.uToast.show({
							type: "error",
							message: "图形验证码错误！"
						});
						// 失败则刷新验证码, 清空文本
						this.updateImageCode();
						this.form.graphicVerifyCode = "";
					} else {
						// 验证码验证成功后调用登录接口
						// 若登录接口调用成功  保存token、跳转首页
						// 否则提示失败信息
						let params = {
							account: this.form.userName,
							pass: this.form.passWord,
							// captcha: this.form.graphicVerifyCode,   // 暂时不传
						}
						uni.$u.http.post('/app/oauth/api/login', params).then(res => {
							if(res.code == 0){
								// 登录成功后保存token
								if(res.data._tk){
									uni.setStorageSync("wp_token",res.data._tk);
								}
								this.$refs.uToast.show({
									type: "success",
									message: "登录成功！"
								});
								setTimeout(() => {
									uni.navigateTo({
										url: "/pages/home/index"
									})
								}, 1500)
							}else{
								let item = {
									type: 'default',
									title: '默认主题',
									message: res.msg,
									iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/default.png'
								}
								this.showToast(item);
							}
						}).catch((err) =>{
							console.log("err",err.msg)
						})
					}
				}else{
					// 用户名密码校验
					if(!this.form.userName || !this.form.passWord){
						let item = {
							type: 'default',
							title: '默认主题',
							message: "请输入用户名或密码",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/default.png'
						}
						this.showToast(item)
					}else if (!this.form.graphicVerifyCode) {  // 提交前校验图形验证码
						this.$refs.uToast.show({
							type: "default",
							message: "请输入图形验证码！"
						});
					}
				}
			},
			// 消息提示
			showToast(params) {
				this.$refs.uToast.show({
					...params,
					complete() {
						params.url && uni.navigateTo({
							url: params.url
						})
					}
				})
			}	
		}
	}
</script>

<style lang="scss">
	.login-top {
		padding-top: 50px;

		.login-title {
			font-size: 33px;
			font-weight: bold;
			display: flex;
			justify-content: center;
			position: relative;
			left: -20px;

			.login-logo {
				height: 80px;
				width: 80px;
			}

			.login-text-b {
				color: #000;
			}

			.login-text-r {
				color: #C93A3A;
			}

			.login-text-com {
				position: absolute;
				right: 15%;
			}
		}
	}

	.login-middle {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 30px;

		.login-info {
			width: 80%;

			.login-user-put {}

			.login-password-put {
				margin-top: 15px;
			}

			.login-code {
				display: flex;
				justify-content: center;

				.code-key {
					position: relative;
					top: 15px;
				}

				.code-img-wrapper {
					position: relative;
					top: 12px;
				}
			}
		}
	}

	.submit-btn {
		display: flex;
		justify-content: center;
		margin-top: 15px;
	}
</style>