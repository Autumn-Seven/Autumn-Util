/**
 * Created by Seven on 2020/3/17.
 * project: Autumn-util
 * email: fighting20xx@126.com
 */

export default {
	// 操作  Url  param

	/**
	 * 获取指定 URL 的参数。
	 */
	getParam: function(sParamName, sUrl = location.href) {
		return this.getParams(sUrl)[sParamName];
	},
	/**
	 * 获取 URL 中所有参数信息。
	 */
	getParams: function(sUrl = location.href) {
		// 过滤后面的锚点。
		sUrl = sUrl.replace(/#.*/g, '');
		// 取出 ? 后面的参数串。
		sUrl = sUrl.split('?')[1] || '';

		var oParam = {};
		sUrl.split('&').forEach(function(sItem) {
			var asParam = sItem.split('=');
			if (asParam[0]) {
				oParam[asParam[0]] = decodeURIComponent(asParam[1]);
			}
		});

		return oParam;
	},

	/**
	 * 返回指定 URL 中是否包含指定参数。
	 */
	hasParam: function(sParamName, sUrl = location.href) {
		return this.getParam(sParamName, sUrl) !== undefined;
	},
	/**
	 * 添加指定参数到指定 URL。
	 */
	setParam: function(sParamName, sValue, sUrl = location.href) {
		let oData = {};
		oData[sParamName] = sValue;

		return this.setParams(oData, sUrl);
	},
	/**
	 * 添加多个参数到指定 URL。
	 */
	setParams: function(oParams, sUrl = location.href) {
		let _this = this,
			sUri = sUrl.split('?')[0],
			oParamData = _this.getParams(sUrl)
		;

		// 合并。
		Object.assign(oParamData, oParams);
		// 重新转换回来。
		let sParams = _this.objToParams(oParamData);

		if (sParams) {
			return sUri + '?' + sParams;
		} else {
			return sUri;
		}
	},
	/**
	 * 删除指定的参数。
	 */
	removeParam: function(sParamName, sUrl = window.locaiton.href) {
		var REMOVE_VALUE = 'remove';

		return this.setParam(sParamName, REMOVE_VALUE, sUrl).
		replace(new RegExp(
			'([\?&]?)' + sParamName + '=' + REMOVE_VALUE + '[&]?', 'g'),
			'$1') // 过滤对应的参数项。
			.replace(/&$/, '') // 过滤最后一个多的 & 符号。
			;
	},

	/**
	 * 删除多个 URL 参数。
	 */
	removeParams: function(asParamNames, sUrl = location.href) {
		var _this = this,
			_url = sUrl
		;

		asParamNames.forEach((sParam) => {
			_url = _this.removeParam(sParam, _url);
		});

		return _url;
	},

	/**
	 * 将对象转换成 URL 参数，并对字符进行转义。
	 *  @param isEncodeURIComponent 是否编码，默认不编码
	 */

	objToParams(obj, isEncodeURIComponent = false) {
		let str = '';
		for (let key in obj) {
			if (str !== '') {
				str += '&';
			}
			str += key + '=' + (isEncodeURIComponent
				? encodeURIComponent(obj[key])
				: obj[key]);
		}
		return str;
	},
	/*
	 * 转换 url params参数为obj
	 * @param str 传入url参数字符串
	 * @param isDecodeURI 是否解码，默认不解码
	 * @returns {Object}
	 * eg. paramsToObj('http://www.cctv.com?name=大佬&age=18')
	 */
	paramsToObj(str, isDecodeURI = false) {
		let obj = {};
		str = str.substring(str.indexOf('?') + 1);
		try {
			obj = JSON.parse('{"' +
				(isDecodeURI ? decodeURI(str) : str).replace(/"/g, '\\"').
				replace(/&/g, '","').
				replace(/=/g, '":"') + '"}');
		} catch (e) {
			console.log(e);
		}
		return obj;
	},
};
