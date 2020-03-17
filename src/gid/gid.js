/**
 * Created by Seven on 2020/3/17.
 * project: Autumn-util
 * email: fighting20xx@126.com
 */


export default {

	/**
	 * 使用 MD5 进行加密。
	 * 依赖 md5.min.js
	 *
	 * @param {String} sValue
	 * @param {String|undefined} sKey
	 * @param {Boolean|undefined} bRaw
	 * @return{String}
	 */
	md5: function(sValue, sKey, bRaw) {
		return window.md5 && window.md5(sValue, sKey, bRaw).toUpperCase() ||
			null;
	},
	encode: function(sValue) {
		return btoa(encodeURIComponent(sValue).replace(/%([0-9A-F]{2})/g,
			function toSolidBytes(match, p1) {
				return String.fromCharCode('0x' + p1);
			}));
	},
	decode: function(sCode) {
		return decodeURIComponent(atob(sCode).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
	},

	/**
	 * 生成一个 32 位的 id。
	 * 依赖 md5.min.js
	 */
	gid: function() {
		let _this = this;

		return _this.md5(new Date + ',' + _this.random(1000, 9999)) ||
			_this.gsid(32);
	},

	/**
	 * 生成一个 16 位的 id。
	 * 依赖 md5.min.js
	 *
	 * @return {String}
	 */
	gid16: function() {
		return this.gid().substr(8, 16);
	},

	/**
	 * 随机生成一个[a-zA-Z0-9]的编码，默认返回8位。
	 *
	 * @method
	 * @param {Number|undefined} nSize
	 * @return {String}
	 */
	gsid: function(nSize = 8) {
		var asBase = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(
			''),
			nLength = asBase.length,
			asId = []
		;

		while (nSize-- > 0) {
			asId.push(asBase[Math.floor(Math.random() * nLength)]);
		}

		return asId.join('');
	},

	/**
	 * 设置数量显示位，不足指定位用前面用零填充。
	 *
	 * @method fix
	 * @param {Number} nValue 数值。
	 * @param {Number|undefined} nSize 显示的数位。(2)
	 * @return {String}
	 */
	fix: function(nValue, nSize = 2) {
		let nOffset = nSize - String(nValue).length;
		if (nOffset < 0) {
			nOffset = 0;
		}

		return '0'.repeat(nOffset) + nValue;
	},
};
