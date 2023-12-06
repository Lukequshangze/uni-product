<template>
	<view class="content">
		<view class="login-top">
			<view class="login-title">
				<view class="">
					<img src="../../static/icon/loginLogo.png" class="login-logo" alt="" />
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
				<u--input class="login-user-put" placeholder="前置图标" prefixIcon="../../static/icon/login-user.png"
					prefixIconStyle="font-size: 22px;color: #909399"></u--input>
				<u--input class="login-password-put" placeholder="前置图标"
					prefixIcon="../../static/icon/login-password.png"
					prefixIconStyle="font-size: 22px;color: #909399"></u--input>
				<view class="login-code">
					<view class="code-key">
						验证码：
					</view>
					<u--input border="bottom" v-model="form.graphicVerifyCode" style="padding:0;letter-spacing: 8px;"></u--input>
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
				}
			}
		},
		components: {

		},
		onShow() {
			// 登录页面禁止返回上一页，隐藏返回箭头
			let a = document.getElementsByClassName('uni-page-head-hd')[0];
			a.style.display = 'none';
		},
		onLoad() {

		},
		onReady() {
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
				this.mcaptcha.refresh()
			},
			// 提交前校验图形验证码
			submit() {
				if (!this.form.graphicVerifyCode) {
					this.$refs.uToast.show({
						type: "default",
						message: "请输入图形验证码！"
					});
				}
				let validate = this.mcaptcha.validate(this.form.graphicVerifyCode)
				if (!validate) {
					// return uni.showToast({ title: '图形验证码错误',icon:"error" });
					this.$refs.uToast.show({
						type: "error",
						message: "图形验证码错误！"
					});
					// 失败则刷新验证码, 清空文本
					this.updateImageCode();
					this.form.graphicVerifyCode = "";
				} else {
					this.$refs.uToast.show({
						type: "success",
						message: "验证成功！"
					});
					// 登录成功后保存token
					uni.setStorageSync("token","123456789abcdefg")
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/home/index"
						})
					}, 1500)
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-top {
		margin-top: 50px;

		.login-title {
			font-size: 33px;
			font-weight: bold;
			display: flex;
			justify-content: center;

			.login-logo {
				height: 80px;
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