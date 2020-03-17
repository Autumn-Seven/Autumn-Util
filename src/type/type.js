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
		conflict: function() {
			window._util = _util;
			return Utils;
		},

		/**
		 * 变量的类型。
		 * @param {String} oData
		 */
		typeOf: function(oData) {
			return Object.prototype.toString.apply(oData).
			match(/\[object (.*?)\]/)[1].toLowerCase();
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

		//对象是否包含某属性
		hasAttr(obj, attr) {
			//判断是否有该键值
			if (obj && obj.hasOwnProperty(attr)) {
				//如果有返回true
				return true;
			}
			return false;
		},

		merge(target, source, overwrite) {
			// We should escapse that source is string
			// and enter for ... in ...
			if (!this.isObject(source) || !this.isObject(target)) {
				return overwrite ? clone(source) : target;
			}

			for (var key in source) {
				if (source.hasOwnProperty(key)) {
					var targetProp = target[key];
					var sourceProp = source[key];

					if (this.isObject(sourceProp)
						&& this.isObject(targetProp)
						&& !this.isArray(sourceProp)
						&& !this.isArray(targetProp)
					// && !this.isDom(targetProp)
					// && !this.isBuiltInObject(sourceProp)
					// && !this.isBuiltInObject(targetProp)
					// && !this.isPrimitive(sourceProp)
					// && !this.isPrimitive(targetProp)
					) {
						// 如果需要递归覆盖，就递归调用merge
						this.merge(targetProp, sourceProp, overwrite);
					}
					else if (overwrite || !(key in target)) {
						// 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
						// NOTE，在 target[key] 不存在的时候也是直接覆盖
						target[key] =this.clone(source[key], true);
					}
				}
			}

			return target;
		},
		mergeAll(targetAndSources, overwrite) {
			var result = targetAndSources[0];
			for (var i = 1, len = targetAndSources.length; i < len; i++) {
				result = this.merge(result, targetAndSources[i], overwrite);
			}
			return result;
		},

		/*深拷贝*/
		mergeDeep(target) {
			let tempObj = Array.isArray(target) ? [] : {};
			for (let key in target) {
				tempObj[key] = Utils.isObject(target[key]) ? Util.mergeDeep(
					target[key]) : target[key];
			}
			return tempObj;
		},


		/**
		 *  extend扩展，  直接给予目标对象某种属性
		 * */
		extend(target, source) {
			for (var key in source) {
				if (source.hasOwnProperty(key)) {
					target[key] = source[key];
				}
			}
			return target;
		},




		/**
		 * 对象扩展（默认深拷贝）。
		 *
		 * @return {Object}
		 */
		extends() {
			var options, name, src, copy, copyIsArray, clone,
				target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				deep = true
			;

			//如果第一个值为bool值，那么就将第二个参数作为目标参数，同时目标参数从2开始计数
			if ( typeof target === 'boolean' ) {
				deep = target;
				target = arguments[1] || {};
				// skip the boolean and the target
				i = 2;
			}
			// 当目标参数不是object 或者不是函数的时候，设置成object类型的
			if ( typeof target !== 'object' && !this.typeOf(target) === 'Function' ) {
				target = {};
			}
			//如果extend只有一个函数的时候，那么将跳出后面的操作
			if ( length === i ) {
				target = this;
				--i;
			}
			for ( ; i < length; i++ ) {
				// 仅处理不是 null/undefined values
				if ( (options = arguments[ i ]) !== null ) {
					// 扩展options对象
					for ( name in options ) {
						src = target[ name ];
						copy = options[ name ];
						// 如果目标对象和要拷贝的对象是恒相等的话，那就执行下一个循环。
						if ( target === copy ) {
							continue;
						}
						// 如果我们拷贝的对象是一个对象或者数组的话
						if ( deep && copy && ( this.isPlainObject(copy) || (copyIsArray = this.typeOf(copy) === 'Array') ) ) {
							if ( copyIsArray ) {
								copyIsArray = false;
								clone = src && this.typeOf(src) === 'Array' ? src : [];
							} else {
								clone = src && this.isPlainObject(src) ? src : {};
							}

							//不删除目标对象，将目标对象和原对象重新拷贝一份出来。
							target[ name ] = this.extends( deep, clone, copy );
							// 如果options[name]的不为空，那么将拷贝到目标对象上去。
						} else if ( copy !== undefined ) {
							target[ name ] = copy;
						}
					}
				}
			}

			// 返回修改的目标对象
			return target;
		},



		/**
		 * 智能clone 纯粹对象 或者数组， 不能clone 函数，    遇到函数之类的就要用上面的extends了
		 *
		 * */

		clone (obj) {
			return JSON.parse(JSON.stringify(obj));
		},

		/**
		 * 构造类继承关系
		 * @memberOf module:zrender/core/util
		 * @param {Function} clazz 源类
		 * @param {Function} baseClazz 基类
		 */
		inherits(clazz, baseClazz) {
			var clazzPrototype = clazz.prototype;

			function F() {}

			F.prototype = baseClazz.prototype;
			clazz.prototype = new F();

			for (var prop in clazzPrototype) {
				clazz.prototype.constructor = clazz;
				clazz.superClass = baseClazz;
			}
		},

		// mixin(target, source, overlay) {
		// 	target = 'prototype' in target ? target.prototype : target;
		// 	source = 'prototype' in source ? source.prototype : source;
		//
		// 	defaults(target, source, overlay);
		// },

		/**
		 * 指定延迟时间后执行的动作。
		 *
		 * @param {Number} nTimeout 单位毫秒。
		 * @param {Function} fnTodo 函数句柄。
		 * @return {Number} setTimeout 的定时器。
		 */
		timeout: function(nTimeout, fnTodo) {
			return setTimeout(fnTodo, nTimeout);
		},

	};
