/* 
	uni消息相关的api封转
 */

/* 
 *	统一的消息通提示命令封装
 *	@params {String} title 提示的内容
 *	@params {Number} duration 提示的延迟时间
 *	@params {Boolean} mask 是否显示透明蒙层，防止触摸穿透，默认：false
 *	@params {String} icon 值：success、loading、none
 */
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

export default {
	msg
}