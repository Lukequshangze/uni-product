# uni-product  本项目基于uni-app开发的移动端app

# 工具准备
	## 开发工具 HBuilder X  下载地址：https://www.dcloud.io/hbuilderx.html;
	## git clone 项目的git地址，该操作将项目克隆到本地;
	## HBuilder下载完成，安装成功后点击左上角文件，打开目录，选择本地项目即可进行项目运行、打包等操作;

# 环境准备
	## git安装  下载地址：https://git-scm.com/download    
	## node安装  下载地址：https://nodejs.org/en   注意尽量不下载最新版本即可（最新版本不稳定）;

# 插件准备 
	## 打开HBuilder X顶部运行，运行到浏览器，选择一个浏览器后开发工具会自动检测到运行项目所需各种插件并自动进行下载;
	## 打包时点击HBuilder X顶部的发行，选择原生App-云打包，填写完相关信息后点击右下角打包按钮，会自动提示缺失的插件并自行下载;

# 打包流程
	## 打开跟目录下manifest.json文件，对项目进行基础配置，如应用名称，app图标，版本号等;
	## 配置完成后，点击顶部发行按钮，选择原生App-云打包后勾选 Android（apk包）;
	## 证书选择 使用自有证书
	## 证书名称 student
	## 证书私钥密码 123456789
	## 证书文件 选择e65e445a76b640bc9629dc530718f0d5.keystore文件，该文件会随项目一起交付;
	## 以上信息填写完成后其他信息无需再改
	## 选择底部传统打包（上传代码及证书，DCloud承诺不保留）后点击右侧打包按钮；
	## 打包会有一个校验过程，校验完成后选择继续打包;此时控制台会提示打包预计时常等信息;
	## 打包完成后控制台会生成apk包的"下载地址"，点击链接地址进行下载即可,讲下载好的apk包安装到手机即可正常使用;