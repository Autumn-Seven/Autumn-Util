/**
 * Created by Seven on 2020/3/17.
 * project: Autumn-util
 * email: fighting20xx@126.com
 */

export default {

	/**
	 * 生成一个 [min, max] 之间的值。
	 *
	 * @param {Number} nMin 最小时，包含。
	 * @param {Number} nMax 最大值，包含。
	 * @return {Number}
	 */
	random: function(nMin, nMax) {
		return Math.round(Math.random() * (nMax - nMin) + nMin);
	},

	//格式化价格，12345.1  =》 12,345.10
	formatePrice(value) {
		value = (value + '').replace(/\.\d{2}(\d*)/,
			(match, $1) => match.replace($1, ''));//强制截取两位小数
		if (isNaN(value)) {
			return '';
		} else {
			//补0
			var s = value.toString();
			var rs = s.indexOf('.');
			if (rs < 0) {
				rs = s.length;
				s += '.';
			}
			while (s.length <= rs + 2) {
				s += '0';
			}
		}
		//千分位打逗号
		return (s + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
	},

	/*
	 *保留n位小数
	 *@param num {Number|String} 原数字 1.33或者'1.33'
	 *@returns {String} 返回字符串
	 */
	toThousands(num, n) {
		return parseFloat(num).
		toFixed(n).
		replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, '$1,');
	},

	//float偏移处理 eg.  1.67*100结果会偏移，使用mul(1.67*100)
	mul(a, b) {
		let c = 0,
			d = a.toString().replace(',', ''),
			e = b.toString();
		try {
			c += d.split('.')[1].length;
		} catch (f) {
		}
		try {
			c += e.split('.')[1].length;
		} catch (f) {
		}
		return Number(d.replace('.', '')) * Number(e.replace('.', '')) /
			Math.pow(10, c);
	},

};
