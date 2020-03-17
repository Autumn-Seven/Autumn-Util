/**
 * Created by Seven on 2020/3/17.
 * project: Autumn-util
 * email: fighting20xx@126.com
 */

export default {

	/**
	 * 生成一个随机的颜色值。
	 * 如 #ABC123
	 *
	 * @return {String}
	 */
	randomColor(){
		let asColors = [];
		for (let i = 0; i < 6; i++) {
			asColors.push(
				'0123456789abcdef'[Math.floor(Math.random() * 16)],
			);
		}
		return '#' + asColors.join('').toUpperCase();
	},

	/**
	 * 16进制 颜色 转化为 Rgb颜色。
	 * @param {Object} sHex
	 * @return {String} sColor
	 */
	colorRgb: function(sHex) {
		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
		var sColor = sHex.toLowerCase();
		var i = 0;

		if (sColor && reg.test(sColor)) {
			if (sColor.length === 4) {
				var sColorNew = '#';
				for (i = 1; i < 4; i += 1) {
					sColorNew += sColor.slice(i, i + 1).
					concat(sColor.slice(i, i + 1));
				}
				sColor = sColorNew;
			}

			//处理六位的颜色值
			var sColorChange = [];
			for (i = 1; i < 7; i += 2) {
				sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
			}
			return 'rgb(' + sColorChange.join(',') + ')';
		} else {
			return sColor;
		}
	},

	/**
	 * Rgb 颜色 转化为 16进制颜色。
	 * @param {Object} sRgb
	 * @return {String} strHex
	 */
	colorHex: function(sRgb) {
		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
		var that = sRgb;
		var i;

		if (/^(rgb|RGB)/.test(that)) {
			var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
			var strHex = '#';
			for (i = 0; i < aColor.length; i++) {
				var hex = Number(aColor[i]).toString(16);
				if (hex === '0') {
					hex += hex;
				}
				strHex += hex;
			}
			if (strHex.length !== 7) {
				strHex = that;
			}
			return strHex;
		} else if (reg.test(that)) {
			var aNum = that.replace(/#/, '').split('');
			if (aNum.length === 6) {
				return that;
			} else if (aNum.length === 3) {
				var numHex = '#';
				for (i = 0; i < aNum.length; i += 1) {
					numHex += (aNum[i] + aNum[i]);
				}
				return numHex;
			}
		} else {
			return that;
		}
	},

	/**
	 * 将 px 类型的数值单位解析成整形数据。
	 *
	 * @param {String} sValue px 单位值，如 10px 0 null undefined
	 * @return {Number}
	 */
	parsePxValue(sValue) {
		return parseInt((sValue || '').replace('px', ''), 10);
	},
};
