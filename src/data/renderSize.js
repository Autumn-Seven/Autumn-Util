/**
 * Created by Seven on 2020/3/17.
 * project: Autumn-util
 * email: fighting20xx@126.com
 */


/**
 * /// <summary>
 /// 格式化文件大小的JS方法
 /// </summary>
 /// <param name="filesize">文件的大小,传入的是一个bytes为单位的参数</param>
 /// <returns>格式化后的值</returns>
 * */

export const renderSize = function (value) {
	if(null==value||value==''){
		return "0 Bytes";
	}
	var unitArr = new Array("B","KB","MB","GB","TB","PB","EB","ZB","YB");
	var index=0;
	var srcsize = parseFloat(value);
	index=Math.floor(Math.log(srcsize)/Math.log(1024));
	var size =srcsize/Math.pow(1024,index);
	size=size.toFixed(1);//保留的小数位数
	return size+unitArr[index];
}
