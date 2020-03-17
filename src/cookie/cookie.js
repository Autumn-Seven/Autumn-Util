/**
 * Created by Seven on 2020/3/17.
 * project: Autumn-util
 * email: fighting20xx@126.com
 */

export default {

	/**
	 * 获取指定名称的 Cookie 值。
	 *
	 * @param {String} sName
	 * @return {String}
	 */
	getCookie: function(sName) {
		var sCookie = document.cookie;

		if (sCookie) {
			// 分割出所有 Cookie 项。
			var asCookies = sCookie.split(';');
			var asItem;

			// 遍历逐一找指定名称的那个项。
			for (var i = 0, l = asCookies.length; i < l; i++) {
				// 将当前项名称和值分割。
				asItem = asCookies[i].trim().split('=');

				// 名称匹配检测。
				if (asItem[0] == sName) {
					return decodeURIComponent(asItem[1]);
				}
			}
		}

		return '';
	},

	/**
	 * 写入或删除 Cookie 值。
	 *
	 * @param {String} sName
	 * @param {String} sValue
	 * @param {Object} oOptions
	 */
	setCookie: function(sName, sValue, oOptions) {
		if (!oOptions) {
			oOptions = {};
		}

		// 假如要设置的值为 null，则作删除操作。
		if (sValue === null || sValue === undefined || sValue === '') {
			sValue = '';
			oOptions.expires = -1;	// 设置过去的时间，以使 cookie 马上过期。
		}

		// 根据参数判断过期时间。
		var sExpires = oOptions.expires;

		// 如果过期时间未设置，默认一年后过期。
		if (!sExpires) {
			sExpires = 365;
		}

		// 检测参数类型。
		var sArgumentType = (typeof sExpires).toLowerCase();
		if (sArgumentType == 'number') {
			// 数字型。

			// 添加天数。
			var dDate = new Date();
			dDate.setTime(
				dDate.getTime() + (sExpires * 24 * 60 * 60 * 1000));

			sExpires = dDate.toUTCString();
		} else if (sArgumentType == 'date') {
			// 日期型。

			sExpires = sExpires.toUTCString();
		}

		// 过期时间。
		sExpires = '; expires=' + sExpires;
		// 路径。
		var sPath = oOptions.path ? '; path=' + (oOptions.path) : '';
		// 域。
		var sDomain = oOptions.domain
			? '; domain=' + (oOptions.domain)
			: '';
		// 加密。
		var sSecure = oOptions.secure ? '; secure' : '';

		// 写入到 Cookie。
		document.cookie = [
			sName, '=', encodeURIComponent(sValue), sExpires,
			sPath, sDomain, sSecure].join('');
	},

	/**
	 * 删除指定 Cookie。
	 *
	 * @param {String} sName
	 * @param {Object|undefined} oOPtions
	 * returnl {void}
	 */
	removeCookie: function(sName, oOptions) {
		this.setCookie(sName, null, oOptions);
	},


	//存储
	set(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	},
	//取出数据
	get(key) {
		return JSON.parse(localStorage.getItem(key));
	},

	// 删除数据
	remove(key) {
		localStorage.removeItem(key);
	}

};
