/**
 * Created by Seven on 2019/8/28.
 * project: Autumn-util
 * email: fighting20xx@126.com
 *
 * webpack打包入口文件
 */


/**
 * require.context函数接受三个参数
			 directory {String} -读取文件的路径
			 useSubdirectories {Boolean} -是否遍历文件的子目录
			 regExp {RegExp} -匹配文件的正则
 * */
let moduleExports = {};
const r = require.context('./', true, /^\.\/.+\/.+\.js$/);

r.keys().forEach(key => {
	let fileName = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
	let value = r(key);


	/**
	 * 默认一个文件只导出一个函数 针对commonJS语法  module.exports = debounce;
	 * */
	if(typeof (value) === 'function'){
		moduleExports[fileName] = value;
	}


	/**
	 * 导出一个对象，里面包含多个函数{}针对 ES6语法
	 * export const a = function () {}
	 * export const b = {
			kepp:function () {},
			out:function () {},
		}
		 export default {
			bb:function () {},
		}
	 * */
	else if(Object.keys(value).length > 0 ){
		 Object.keys(value).forEach(function (field) {
			 if(typeof (value[field]) === 'function'){
				 moduleExports[field] = value[field];
			 }else if(Object.keys(value[field]).length > 0 ){
				 Object.keys(value[field]).forEach(function (funName) {
					 if(typeof (value[field][funName]) === 'function'){
						 moduleExports[funName] = value[field][funName];
					 }
				 })
			 }
		 });
	}
});

module.exports = moduleExports;
