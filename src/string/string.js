/**
 * Created by Seven on 2020/3/17.
 * project: Autumn-util
 * email: fighting20xx@126.com
 */

export default {

	/*去掉首尾空格*/
	trimStr(str) {
		return str.replace(/(^\s*)|(\s*$)/g, '');
	},
	/**
	 * 检测内容是否是指定类型的。
	 * @param {String} sContent
	 * @param {String} type email、phone、tel、number、english、text、chinese、lower、upper
	 */
	checkStrType(str, type) {
		switch (type) {
			case 'phone':   //手机号码
				return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
			case 'tel':     //座机
				return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
			case 'card':    //身份证
				return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
			case 'pwd':     //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
				return /^[a-zA-Z]\w{5,17}$/.test(str);
			case 'postal':  //邮政编码
				return /[1-9]\d{5}(?!\d)/.test(str);
			case 'QQ':      //QQ号
				return /^[1-9][0-9]{4,9}$/.test(str);
			case 'email':   //邮箱
				return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
			case 'money':   //金额(小数点2位)
				return /^\d*(?:\.\d{0,2})?$/.test(str);
			case 'URL':     //网址
				return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
					str);
			case 'IP':      //IP
				return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(
					str);
			case 'date':    //日期时间
				return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(
					str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str);
			case 'number':  //数字
				return /^[0-9]$/.test(str);
			case 'positiveInteger':  //正整数
				return /^[1-9]\d*$/.test(str);
			case 'price':  //价格
				return /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/.test(
					str);//价格非0则去掉'?'
			case 'english': //英文
				return /^[a-zA-Z]+$/.test(str);
			case 'chinese': //中文
				return /^[\u4E00-\u9FA5]+$/.test(str);
			case 'lower':   //小写
				return /^[a-z]+$/.test(str);
			case 'upper':   //大写
				return /^[A-Z]+$/.test(str);
			case 'HTML':    //HTML标记
				return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
			default:
				return true;
		}
	},

	//字符串首字母变大写
	changeIndexToUpperCase(str) {
		return str.replace(/\b\w+\b/g, function(word) {
			return word.substring(0, 1).toUpperCase() +
				word.substring(1).toLowerCase();
		});
	},
	//字符串首字母变大写
	firstUpperCase(str) {
		return str.replace(/\b\w+\b/g, function(word) {
			return word.substring(0, 1).toUpperCase() +
				word.substring(1);
		});
	},
	//emoji判断
	isEmojiCharacter(substring) {
		for (var i = 0; i < substring.length; i++) {
			var hs = substring.charCodeAt(i);
			if (0xd800 <= hs && hs <= 0xdbff) {
				if (substring.length > 1) {
					var ls = substring.charCodeAt(i + 1);
					var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) +
						0x10000;
					if (0x1d000 <= uc && uc <= 0x1f77f) {
						return true;
					}
				}
			} else if (substring.length > 1) {
				var ls = substring.charCodeAt(i + 1);
				if (ls == 0x20e3) {
					return true;
				}
			} else {
				if (0x2100 <= hs && hs <= 0x27ff) {
					return true;
				} else if (0x2B05 <= hs && hs <= 0x2b07) {
					return true;
				} else if (0x2934 <= hs && hs <= 0x2935) {
					return true;
				} else if (0x3297 <= hs && hs <= 0x3299) {
					return true;
				} else if (hs == 0xa9 || hs == 0xae || hs == 0x303d ||
					hs == 0x3030
					|| hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
					|| hs == 0x2b50) {
					return true;
				}
			}
		}
	},


	/**
	 * 占位符替换工厂。
	 *
	 * @method
	 * @param {String} sContent 含占位符的字符串。
	 * 	当要被替换的内容中含未知替换数据，则会保留当前点位符。
	 * @param {Object} oData 要替换的点位符数据，依据对象的键名与点位符一一对应，功能类似 KISSY.substitute。
	 * @param {String} sUnValue 当值为空、null、NaN 等无效值时，使用该值来替代，如果该值也无效，则会继续使用原来的值。
	 * @return {String} 返回替换后的字符串。
	 */
	substitute: function (sContent, oData, sUnValue) {
		if (!oData) {
			return sContent;
		}

		var sValue = '';
		for (var p in oData) {
			sValue = oData[p];
			if (!sValue && sUnValue != undefined) {
				sValue = sUnValue;
			}

			sContent = sContent.replace(new RegExp('\\{' + p + '\\}', 'g'), sValue);
		}

		return sContent;
	},
};
