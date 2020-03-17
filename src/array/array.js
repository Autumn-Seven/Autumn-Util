/**
 * Created by Seven on 2020/3/17.
 * project: Autumn-util
 * email: fighting20xx@126.com
 */

export  default {
	// 数组操作。

	/*数组删除指定元素*/
	remove(arr, ele) {
		var index = arr.indexOf(ele);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	},
	// 数组求并集
	union(a, b) {
		return [...new Set([...a, ...b])];
	},
	// 数组求交集
	intersect(a, b) {
		return [...new Set([...a].filter(x => b.includes(x)))];
	},
	//数组求差集
	difference(a, b) {
		return [...new Set([...a].filter(x => !b.includes(x)))];
	},
	//数组内部交换
	internalExchange(n, m, arr) {
		[arr[n], arr[m]] = [arr[m], arr[n]];
	},
	//数组去重
	noRepeat(arr) {
		return [...new Set([...arr])];
	},
	/*数组最大值*/
	max(arr) {
		return Math.max.apply(null, arr);
	},
	/*数组最小值*/
	min(arr) {
		return Math.min.apply(null, arr);
	},
	/*数组最小值*/
	oneOf(value, arr) {
		return arr.indexOf(value) > -1;
	},

	/***
	 * 从数组中随机取值，
	 * arr, 目标数组，  传入数字，随机返回一个item （默认，每个item的概率一致）
	 * percentArry， 权重数组，调整数组中的元素的概率
	 *
	 * 如（[red, green, blue, yellow],  [1, 3, 5]）   那么概率为   red  1/9  ， green 3/9 ， blue 5/9 ，  yellow 0
	 * */
	randomItem(arr, percentArry = []) {

		var arr2 = this.clone(percentArry);

		if(arr2.length === 0){
			arr2 = arr.map(()=>1)
		}

		while(arr2.length < arr.length){
			arr2.push(0);
		}

		let sum = 0;
		let last = 0;
		arr2.forEach(function(v) {
			sum = sum + (v ? v : 0);
		});

		for (var i = 0; i < arr.length; i++) {
			sum = sum- last;
			var random = Math.random();
			if (random <= (arr2[i] || 0) / sum) {
				return arr[i];
			}
			last = arr2[i] || 0;
		}
	},

	/***
	 * 数组将维度，  例如 [1,[2,3]]   变为 [1,2,3]
	 *
	 *
	 */
	flatten(arr,ret){
		ret = ret || [];
		if(!this.isArray(arr)) return ret;

		var i = 0,length = arr.length,item;
		while( i < length ){
			item = arr[i++];

			if(this.isArray(item)){ // 这样判断会更好
				this.flatten(item,ret);
			}else{
				ret.push(item);
			}
		}
		return ret;
	},

	/***
	 * 数组乱序， 重新洗牌算法。
	 * */
	shuffle (arr) {

		var len = arr.length,
			i,temp;
		while(len){
			i = Math.floor(Math.random() * len--);
			temp = arr[i];
			arr[i] = arr[len];
			arr[len] = temp;
		}
		return arr;
	},



	/***
	 * 数组抽取，间隔一定的数目， 或者取得总数为多少。
	 * */
	extract (arr, space, max ) {

		// var len = arr.length,
		//     i,temp;
		// while(len){
		//     i = Math.floor(Math.random() * len--);
		//     temp = arr[i];
		//     arr[i] = arr[len];
		//     arr[len] = temp;
		// }
		// return arr;
	}
};
