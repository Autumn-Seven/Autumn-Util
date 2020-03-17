/**
 * Created by Seven on 2020/3/17.
 * project: Autumn-util
 * email: fighting20xx@126.com
 */

export default {
	//对象是否包含某属性
	hasAttr(obj, attr) {
		//判断是否有该键值
		if (obj && obj.hasOwnProperty(attr)) {
			//如果有返回true
			return true;
		}
		return false;
	},
}
