/**
 * Created by Seven on 2020/3/17.
 * project: Autumn-util
 * email: fighting20xx@126.com
 */


// 添加到全局。
export default {
	/**
	 * 解决 util 冲突处理。
	 * 返回小工具对象，由开发人员自己处理。
	 *
	 * @method
	 * @return {Object}
	 */
	conflict: function () {
		window._util = _util;
		return this;
	},

	/**
	 * 变量的类型。
	 * @param {String} oData
	 */
	typeOf: function (oData) {
		return Object.prototype.toString.apply(oData).match(/\[object (.*?)\]/)[1].toLowerCase();
	},
	isString(o) { //是否字符串
		return Utils.typeOf(o) === 'string';
	},
	isNumber(o) { //是否数字
		return Utils.typeOf(o) === 'number';
	},
	isBoolean(o) { //是否boolean
		return Utils.typeOf(o) === 'boolean';
	},
	isFunction(o) { //是否函数
		return Utils.typeOf(o) === 'function';
	},
	isNull(o) { //是否为null
		return Utils.typeOf(o) === 'null';
	},
	isUndefined(o) { //是否undefined
		return Utils.typeOf(o) === 'undefined';
	},
	isDate(o) { //是否时间
		return Utils.typeOf(o) === 'date';
	},
	isArray(o) { //是否数组
		return Utils.typeOf(o) === 'array';
	},
	/*是否是空数组*/
	isNonEmptyArray(obj = []) {
		return obj && obj.length > 0 && Array.isArray(obj) &&
			typeof obj !== 'undefined';
	},

	/*是否是对象*/
	isObject(item) {
		return (item && typeof item === 'object' && !Array.isArray(item));
	},
	/*是否是空对象*/
	isEmptyObject(obj) {
		return Object.keys(obj).length === 0 && obj.constructor === Object;
	},
	/*是否是非空对象*/
	isNotEmptyObject(obj) {
		return Object.keys(obj).length > 0 && obj.constructor === Object;
	},

	/*是否是纯粹的对象*/
	isPlainObject(obj) {
		//判断是否非window和DOM对象的对象，
		if (!obj || obj.toString() !== '[object Object]' || obj.nodeType ||
			obj.setInterval) {
			return false;
		}
		//constructor是对创建对象的函数的引用（指针）。对于 Object 对象，该指针指向原始的 Object() 函数
		//判断obj是否具有isPrototypeOf属性，isPrototypeOf是挂在Object.prototype上的。通过字面量或自定义类（构造器）创建的对象都会继承该属性方法
		if (obj.constructor && !obj.hasOwnProperty('constructor') &&
			!obj.constructor.prototype.hasOwnProperty('isPrototypeOf')) {
			return false;
		}

		var key;
		for (key in obj) {
			break;
		}
		return key === undefined || obj.hasOwnProperty(key);
	},
};
