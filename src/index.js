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
let r = require.context('./', true, '/*.js/');


r.keys().forEach(key => {
	console.log(key)
	let attr = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
	moduleExports[attr] = r(key);
});



module.exports = moduleExports;
